import { NextResponse } from 'next/server';
import { createWalletClient, http, publicActions } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { hardhat } from 'viem/chains';
import CreditSBTArtifact from '../../../contracts/CreditSBT.json';

// Admin Account (Relayer) - Using Hardhat Account #0
// In production, this would be process.env.RELAYER_PRIVATE_KEY
const RELAYER_PK = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userAddress } = body;

        if (!userAddress) {
            return NextResponse.json({ error: 'User address required' }, { status: 400 });
        }

        console.log(`[Gasless Mint] Processing for ${userAddress}...`);

        // 1. Setup Relayer Wallet
        const account = privateKeyToAccount(RELAYER_PK);
        const client = createWalletClient({
            account,
            chain: hardhat,
            transport: http('http://127.0.0.1:8545')
        }).extend(publicActions);

        // 2. Execute Transaction (Company pays gas)
        const { request: txRequest } = await client.simulateContract({
            address: CONTRACT_ADDRESS,
            abi: CreditSBTArtifact.abi,
            functionName: 'mintTo',
            args: [userAddress, '0x', [3n]], // Mint to User, Dummy Proof
            account
        });

        const hash = await client.writeContract(txRequest);

        console.log(`[Gasless Mint] Success! Tx: ${hash}`);

        return NextResponse.json({
            success: true,
            txHash: hash,
            message: "Gas fees paid by ZK-Credit Protocol"
        });

    } catch (error: any) {
        console.error('[Gasless Mint] Error:', error);
        // Extract inner error message if possible
        const errorMessage = error?.cause?.message || error.message || error.toString();
        return NextResponse.json({
            error: 'Minting failed',
            details: errorMessage
        }, { status: 500 });
    }
}
