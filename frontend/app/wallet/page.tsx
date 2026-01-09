'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from 'wagmi';
import CreditSBTArtifact from '../../contracts/CreditSBT.json';
import Link from 'next/link';

export default function WalletPage() {
    const { address, isConnected } = useAccount();
    const [hasToken, setHasToken] = useState(false);

    // Read balance from contract
    const { data: balance } = useReadContract({
        address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        abi: CreditSBTArtifact.abi,
        functionName: 'balanceOf',
        args: [address],
    });

    useEffect(() => {
        if (balance && Number(balance) > 0) {
            setHasToken(true);
        }
    }, [balance]);

    return (
        <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">Z</div>
                    <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                        ZK-Credit
                    </span>
                </Link>
                <div className="flex gap-4 items-center">
                    <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
                    <Link href="/wallet" className="text-sm text-white font-bold border-b-2 border-blue-500">My Wallet</Link>
                    <Link href="/business" className="text-sm text-slate-400 hover:text-white transition-colors">Business Model</Link>
                    <ConnectButton showBalance={false} />
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 pt-12 pb-24 relative z-10">
                <h1 className="text-3xl font-bold mb-2">My Credit Wallet</h1>
                <p className="text-slate-400 mb-12">보유 중인 신용 인증 및 자격 증명 관리</p>

                {isConnected ? (
                    hasToken ? (
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            {/* Card Display */}
                            <div className="relative group perspective-1000">
                                <div className="relative w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-slate-800 to-black border border-slate-700 shadow-2xl overflow-hidden transform transition-transform duration-500 hover:rotate-y-6 hover:scale-105">
                                    {/* Card Shine */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Gold Gradient overlay for Premium feel */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent pointer-events-none" />

                                    <div className="absolute top-6 left-6">
                                        <div className="text-xs text-yellow-500 font-bold tracking-widest mb-1">PREMIUM PROOF</div>
                                        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">
                                            Credit Pass
                                        </div>
                                    </div>

                                    <div className="absolute top-6 right-6">
                                        <div className="w-10 h-10 rounded-full border border-yellow-500/30 flex items-center justify-center bg-black/40 backdrop-blur-md">
                                            <span className="text-yellow-500 font-bold">A+</span>
                                        </div>
                                    </div>

                                    {/* Chip */}
                                    <div className="absolute top-24 left-6 w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-600 rounded-md opacity-80" />

                                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                        <div>
                                            <div className="text-[10px] text-slate-500 mb-1">VERIFIED ADDRESS</div>
                                            <div className="font-mono text-sm text-slate-300 tracking-wider">
                                                {address?.slice(0, 6)}...{address?.slice(-4)}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] text-slate-500 mb-1">ISSUER</div>
                                            <div className="text-sm font-bold text-white flex items-center gap-1 justify-end">
                                                <span>ZK-Credit Protocol</span>
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        온체인 유효성 검증됨 (Active)
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-6">
                                <div className="bg-slate-900/50 backdrop-blur p-6 rounded-2xl border border-slate-800">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        증명 세부 정보
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400 text-sm">증명 타입</span>
                                            <span className="text-white text-sm">소득 구간 인증 (Income &gt; 30M)</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400 text-sm">발급 일시</span>
                                            <span className="text-white text-sm">{new Date().toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400 text-sm">토큰 ID</span>
                                            <span className="font-mono text-yellow-500 text-sm">#0001</span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-slate-400 text-sm">발급자</span>
                                            <span className="text-slate-300 text-sm">National Tax Service (Mock)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-amber-500/10 to-yellow-600/10 p-6 rounded-2xl border border-amber-500/20">
                                    <h3 className="text-amber-400 font-bold mb-2">특별 혜택 활성화됨</h3>
                                    <ul className="space-y-2 text-sm text-slate-300">
                                        <li className="flex items-center gap-2">✅ ZK-Bank 대출 금리 3.5% 적용 가능</li>
                                        <li className="flex items-center gap-2">✅ 프리미엄 라운지 이용 자격 획득</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-300 mb-2">보유한 인증서가 없습니다.</h3>
                            <p className="text-slate-500 mb-6">지금 바로 소득 인증을 진행하고 신용 배지를 받아보세요.</p>
                            <Link href="/">
                                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-colors">
                                    인증서 발급받으러 가기
                                </button>
                            </Link>
                        </div>
                    )
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-400 mb-4">지갑을 연결하여 보유 자산을 확인하세요.</p>
                        <div className="inline-block">
                            <ConnectButton />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
