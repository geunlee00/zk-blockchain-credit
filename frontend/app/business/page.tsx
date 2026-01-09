'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function BusinessPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
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
                    <Link href="/wallet" className="text-sm text-slate-400 hover:text-white transition-colors">My Wallet</Link>
                    <Link href="/business" className="text-sm text-white font-bold border-b-2 border-purple-500">Business Model</Link>
                    <ConnectButton showBalance={false} />
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 pt-8 pb-24 relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-white mb-4">
                        Business Model Canvas
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        공공 데이터와 영지식 증명(ZKP)을 결합한 차세대 신용 인증 프로토콜의 비즈니스 구조입니다.
                    </p>
                </div>

                {/* BMC Grid - 5 Columns Layout for Desktop */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 auto-rows-min">

                    {/* 1. Key Partners (Left, Tall) */}
                    <div className="md:col-span-1 md:row-span-2 bg-slate-900/50 backdrop-blur border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-colors">
                        <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                            🤝 Key Partners
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>• <b className="text-white">국세청/공공기관</b><br />(API 데이터 제공)</li>
                            <li>• <b className="text-white">시중 은행</b><br />(대출 상품 연동, ZK-Bank)</li>
                            <li>• <b className="text-white">신용평가사 (CB)</b><br />(기존 평가 모델 보완)</li>
                        </ul>
                    </div>

                    {/* 2. Key Activities (Left-Mid, Top) */}
                    <div className="md:col-span-1 bg-slate-900/50 backdrop-blur border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-colors">
                        <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                            ⚡ Key Activities
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>• ZK 검증 회로(Circuit) 개발</li>
                            <li>• 스마트 컨트랙트 감가 및 배포</li>
                            <li>• 금융기관 파트너십 체결</li>
                            <li>• 개인정보 보안 감사</li>
                        </ul>
                    </div>

                    {/* 3. Value Propositions (Center, Tall, Highlighted) */}
                    <div className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-purple-900/40 to-slate-900/40 backdrop-blur border border-purple-500/50 p-6 rounded-2xl shadow-xl hover:shadow-purple-500/10 transition-shadow">
                        <h3 className="text-purple-300 font-bold mb-4 flex items-center gap-2 text-lg">
                            💎 Value Propositions
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-white font-bold mb-1">For Users</h4>
                                <ul className="text-sm text-purple-100/70 space-y-1">
                                    <li>• <span className="text-purple-200">Privacy</span>: 소득 금액 비공개</li>
                                    <li>• <span className="text-purple-200">Better Rates</span>: 우대 금리 적용</li>
                                    <li>• <span className="text-purple-200">Fast</span>: 서류 없이 즉시 승인</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">For Banks</h4>
                                <ul className="text-sm text-purple-100/70 space-y-1">
                                    <li>• <span className="text-purple-200">Cost Zero</span>: 심사 비용 절감</li>
                                    <li>• <span className="text-purple-200">New Market</span>: 씬파일러 유입</li>
                                    <li>• <span className="text-purple-200">Trust</span>: 위변조 불가능한 증명</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 4. Customer Relationships (Right-Mid, Top) */}
                    <div className="md:col-span-1 bg-slate-900/50 backdrop-blur border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-colors">
                        <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                            ❤️ Cust. Relationships
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>• <b className="text-white">Automated Trust</b><br />(Smart Contract 기반)</li>
                            <li>• <b className="text-white">Self-Service</b><br />(100% 비대면 프로세스)</li>
                            <li>• <b className="text-white">Community</b><br />(SBT 홀더 거버넌스)</li>
                        </ul>
                    </div>

                    {/* 5. Customer Segments (Right, Tall) */}
                    <div className="md:col-span-1 md:row-span-2 bg-slate-900/50 backdrop-blur border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-colors">
                        <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                            👥 Customer Segments
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="mb-2">
                                <b className="text-white block mb-1">씬파일러 (Thin-filers)</b>
                                - 프리랜서, 크리에이터<br />
                                - 대학생, 사회초년생
                            </li>
                            <li className="mb-2">
                                <b className="text-white block mb-1">고소득 전문직</b>
                                - 연봉 노출을 꺼리는 개인
                            </li>
                            <li>
                                <b className="text-white block mb-1">Web3 Native</b>
                                - 가상자산 담보 대출 희망자
                            </li>
                        </ul>
                    </div>

                    {/* 6. Key Resources (Left-Mid, Bottom) */}
                    <div className="md:col-span-1 bg-slate-900/50 backdrop-blur border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-colors">
                        <h3 className="text-slate-400 font-bold mb-4 flex items-center gap-2">
                            🧱 Key Resources
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>• 검증된 공공 데이터 API</li>
                            <li>• ZK 검증 노드 (Verifier)</li>
                            <li>• Relayer 인프라 (Gasless)</li>
                        </ul>
                    </div>

                    {/* 7. Channels (Right-Mid, Bottom) */}
                    <div className="md:col-span-1 bg-slate-900/50 backdrop-blur border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-colors">
                        <h3 className="text-slate-400 font-bold mb-4 flex items-center gap-2">
                            📣 Channels
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>• 핀테크 앱 (임베디드 지갑)</li>
                            <li>• 세무/회계 플랫폼 연동</li>
                            <li>• Web3 지갑 (Metamask, Rainbow)</li>
                        </ul>
                    </div>

                    {/* 8. Cost Structure (Bottom Left, Wide) */}
                    <div className="md:col-span-2.5 bg-slate-900/30 backdrop-blur border border-slate-800 p-6 rounded-2xl mt-4">
                        <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                            📉 Cost Structure
                        </h3>
                        <div className="flex flex-col md:flex-row gap-8 text-sm text-slate-300">
                            <div className="flex-1">
                                <b className="text-white block mb-2">인프라 운영비</b>
                                - 가스비 대납 비용 (Relayer)<br />
                                - RPC 노드 및 클라우드 서버
                            </div>
                            <div className="flex-1">
                                <b className="text-white block mb-2">R&D 비용</b>
                                - ZK 회로 고도화 및 최적화<br />
                                - 보안 감사 (Audit) 비용
                            </div>
                        </div>
                    </div>

                    {/* 9. Revenue Streams (Bottom Right, Wide) */}
                    <div className="md:col-span-2.5 bg-slate-900/30 backdrop-blur border border-slate-800 p-6 rounded-2xl mt-4">
                        <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                            💰 Revenue Streams
                        </h3>
                        <div className="flex flex-col md:flex-row gap-8 text-sm text-slate-300">
                            <div className="flex-1">
                                <b className="text-white block mb-2">B2B 수수료</b>
                                - 대출 실행 건당 중개 수수료<br />
                                - 기업 전용 API 사용료
                            </div>
                            <div className="flex-1">
                                <b className="text-white block mb-2">B2C 프리미엄</b>
                                - 급행 처리(Fast-track) 수수료<br />
                                - 프리미엄 SBT 스킨 판매
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
