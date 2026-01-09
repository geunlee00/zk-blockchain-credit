'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import Link from 'next/link';
import CreditSBTArtifact from '../contracts/CreditSBT.json';

// Utility for currency formatting
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
};

export default function Home() {
    const { address } = useAccount();
    const [step, setStep] = useState(1);
    const [inputValue, setInputValue] = useState<string>('55000000'); // Default value
    const [data, setData] = useState<any>(null);
    const [proof, setProof] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const { data: hash, writeContract, isPending, error: writeError } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    // Auto-advance step on success
    useEffect(() => {
        if (isConfirmed) {
            setStep(4);
        }
    }, [isConfirmed]);

    const THRESHOLD = 30000000; // 30M KRW

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allow only numbers
        const val = e.target.value.replace(/[^0-9]/g, '');
        setInputValue(val);
    };

    const importMockData = () => {
        setError(null);
        // Simulating fetching data based on user input (or just using the input as the "fetched" mock source)
        const income = parseInt(inputValue, 10);

        if (isNaN(income) || income <= 0) {
            setError("유효한 소득 금액을 입력해주세요.");
            return;
        }

        const mock = {
            source: "국세청(홈택스)",
            year: 2024,
            category: "종합소득세",
            income: income,
            taxPaid: Math.floor(income * 0.15), // Mock tax calculation
            timestamp: new Date().toISOString()
        };

        setTimeout(() => {
            setData(mock);
            setStep(2);
        }, 800);
    };

    const generateProof = () => {
        setError(null);
        // ZK Proof Simulation
        setTimeout(() => {
            if (data.income < THRESHOLD) {
                setError(`자격 미달: 연소득이 ${formatCurrency(THRESHOLD)} 미만입니다.`);
                return;
            }

            setProof({
                pi_a: ["0x2a...", "0x1b..."],
                pi_b: [["0x3c..."], ["0x4d..."]],
                pi_c: ["0x5e..."],
                publicSignals: [1]
            });
            setStep(3);
        }, 2000);
    };

    const mintSBT = () => {
        if (!proof) return;

        writeContract({
            address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
            abi: CreditSBTArtifact.abi,
            functionName: 'mint',
            args: ['0x', [BigInt(3)]], // Dummy proof "0x", Tier [3]
        });
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-purple-500 selection:text-white overflow-hidden relative">

            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">Z</div>
                    <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                        ZK-Credit
                    </span>
                </div>
                <div className="flex gap-4 items-center">
                    <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
                    <Link href="/wallet" className="text-sm text-slate-400 hover:text-white transition-colors">My Wallet</Link>
                    <Link href="/business" className="text-sm text-slate-400 hover:text-white transition-colors">Business Model</Link>
                    <ConnectButton showBalance={false} />
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center pt-12 pb-24 px-4 w-full max-w-3xl mx-auto">

                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                        프라이버시 존중 신용 평가
                    </h1>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto">
                        당신의 소득 정보를 노출하지 않고, <br className="md:hidden" />오직 <strong>신용도</strong>만 온체인으로 증명하세요.
                    </p>
                </div>

                {/* Workflow Cards */}
                <div className="w-full space-y-6">

                    {/* Step 1: Data Input */}
                    <div className={`
            relative p-8 rounded-2xl border backdrop-blur-xl transition-all duration-500
            ${step === 1 ? 'border-blue-500/50 bg-slate-900/60 shadow-[0_0_30px_rgba(59,130,246,0.15)] opacity-100 translate-y-0' : 'border-slate-800 bg-slate-900/40 opacity-50'}
          `}>
                        <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded bg-slate-800 text-slate-400">STEP 01</div>
                        <h2 className="text-2xl font-bold text-white mb-2">데이터 가져오기</h2>
                        <p className="text-slate-400 mb-6">국세청(홈택스) 데이터를 안전하게 로컬로 가져옵니다.</p>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-300">연소득 금액 (모의 입력)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={new Intl.NumberFormat('ko-KR').format(Number(inputValue))}
                                        onChange={(e) => handleInputChange({ target: { value: e.target.value.replace(/,/g, '') } } as any)}
                                        disabled={data !== null}
                                        className="w-full bg-slate-950/50 border border-slate-700 rounded-lg pl-4 pr-16 py-3 text-right font-mono text-lg focus:outline-none focus:border-blue-500 transition-colors text-white"
                                        placeholder="50,000,000"
                                    />
                                    <span className="absolute right-4 top-3.5 text-slate-500">KRW</span>
                                </div>
                            </div>

                            {!data ? (
                                <button
                                    onClick={importMockData}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
                                >
                                    데이터 안전 조회하기
                                </button>
                            ) : (
                                <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-700/50 font-mono text-xs text-green-400 overflow-hidden">
                                    <div className="flex justify-between border-b border-slate-800 pb-2 mb-2">
                                        <span className="text-slate-500">STATUS</span>
                                        <span className="font-bold">FETCHED_SECURELY</span>
                                    </div>
                                    <pre>{JSON.stringify(data, null, 2)}</pre>
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {error}
                            </div>
                        )}
                    </div>


                    {/* Step 2: ZKP Generation */}
                    <div className={`
             relative p-8 rounded-2xl border backdrop-blur-xl transition-all duration-500
            ${step === 2 ? 'border-purple-500/50 bg-slate-900/60 shadow-[0_0_30px_rgba(168,85,247,0.15)] opacity-100 translate-y-0' : 'border-slate-800 bg-slate-900/40 opacity-40'}
          `}>
                        <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded bg-slate-800 text-slate-400">STEP 02</div>
                        <h2 className="text-2xl font-bold text-white mb-2">영지식 증명(ZKP) 생성</h2>
                        <p className="text-slate-400 mb-6"> "소득 {formatCurrency(THRESHOLD)} 이상" 사실만 암호학적으로 증명합니다.</p>

                        {data && !proof && (
                            <button
                                onClick={generateProof}
                                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
                            >
                                증명 생성 시작 (Create Proof)
                            </button>
                        )}

                        {proof && (
                            <div className="bg-slate-950/80 p-4 rounded-lg border border-purple-500/30 text-xs">
                                <div className="flex items-center gap-2 text-purple-400 mb-2 font-bold">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    PROOF GENERATED
                                </div>
                                <div className="font-mono text-slate-400 break-all">
                                    Hash: {proof.pi_a[0].substring(0, 40)}...
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Step 3: Minting */}
                    <div className={`
             relative p-8 rounded-2xl border backdrop-blur-xl transition-all duration-500
            ${step === 3 ? 'border-green-500/50 bg-slate-900/60 shadow-[0_0_30px_rgba(34,197,94,0.15)] opacity-100 translate-y-0' : step > 3 ? 'border-green-500/50 bg-slate-900/60 opacity-100' : 'border-slate-800 bg-slate-900/40 opacity-40'}
          `}>
                        <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded bg-slate-800 text-slate-400">STEP 03</div>
                        <h2 className="text-2xl font-bold text-white mb-2">신용 인증서(SBT) 발급</h2>
                        <p className="text-slate-400 mb-6">증명을 제출하고 온체인 신용 배지를 획득하세요.</p>

                        {proof && !hash && (
                            <button
                                onClick={mintSBT}
                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-all duration-200"
                            >
                                블록체인에 기록하기 (Mint SBT)
                            </button>
                        )}

                        {hash && (
                            <div className="bg-emerald-900/20 border border-emerald-500/50 p-6 rounded-lg text-center animate-pulse-slow">
                                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-emerald-300 mb-2">발급 완료!</h3>
                                <p className="text-slate-400 text-sm mb-4">당신의 지갑에 신용 1등급 인증서가 전송되었습니다.</p>
                                <div className="font-mono text-xs text-emerald-500/70 truncate bg-black/20 p-2 rounded">
                                    Tx: {hash}
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Step 4: Loan Application (UseCase) */}
                    <div className={`
                        relative p-8 rounded-2xl border backdrop-blur-xl transition-all duration-500 overflow-hidden
                        ${step === 4 ? 'border-amber-500/50 bg-slate-900/60 shadow-[0_0_50px_rgba(245,158,11,0.2)] opacity-100 translate-y-0' : 'border-slate-800 bg-slate-900/40 opacity-0 translate-y-4 h-0 p-0 overflow-hidden'}
                    `}>
                        <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded bg-slate-800 text-slate-400">STEP 04</div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            <span className="text-amber-400">ZK-Bank</span> 대출 심사
                        </h2>
                        <p className="text-slate-400 mb-6">신용 인증서(SBT)보유 고객님을 위한 특별 금리 제안</p>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Conventional */}
                            <div className="p-4 rounded-xl border border-slate-700 bg-slate-800/30 opacity-50 grayscale">
                                <h4 className="font-bold text-slate-400 mb-2">일반 심사</h4>
                                <div className="space-y-2 text-sm text-slate-500">
                                    <div className="flex justify-between"><span>서류 제출:</span> <span>필요 (10종)</span></div>
                                    <div className="flex justify-between"><span>심사 기간:</span> <span>3~5일</span></div>
                                    <div className="flex justify-between text-lg font-bold mt-2"><span>예상 금리:</span> <span>6.5% ~</span></div>
                                </div>
                            </div>

                            {/* ZK-Credit */}
                            <div className="relative p-1 rounded-xl bg-gradient-to-br from-amber-300 to-yellow-600 shadow-lg">
                                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                                    추천
                                </div>
                                <div className="h-full bg-slate-900 rounded-[10px] p-4 flex flex-col justify-between">
                                    <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        ZK-Credit 승인
                                    </h4>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div className="flex justify-between"><span>서류 제출:</span> <span className="text-emerald-400 font-bold">제출 완료 (SBT)</span></div>
                                        <div className="flex justify-between"><span>심사 기간:</span> <span className="text-emerald-400 font-bold">즉시 (1초)</span></div>
                                        <div className="border-t border-slate-700 my-2 pt-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-xs">확정 금리</span>
                                                <span className="text-2xl font-bold text-white">3.5%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-3 bg-amber-500 hover:bg-amber-400 text-black font-bold py-2 rounded text-sm transition-colors">
                                        대출 실행하기
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
