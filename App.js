Import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0D0C14",
  surface: "#13121C",
  surfaceHover: "#1A1826",
  border: "#252336",
  borderFaint: "#1A1826",
  gold: "#B8972A",
  goldLight: "#D4AF48",
  goldFaint: "rgba(184,151,42,0.12)",
  text: "#F0EDE6",
  textMid: "#8A879F",
  textFaint: "#3D3B52",
  phase1: "#7C6FCD",
  phase2: "#C06040",
  phase3: "#4A9E7F",
};

const SITUATIONS = [
  {
    id: "idea", icon: "💡", label: "아이디어 도용", hanja: "竊取",
    quote: "남의 것을 취하고도 부끄러움이 없으면, 이미 인(仁)을 잃은 것이다.",
    strategy: [
      { phase: "명분 축적", color: C.phase1, body: "최초 발신 증거를 철저히 구축하라. 이메일·슬랙 원본, 문서 버전 히스토리, 아이디어를 처음 언급한 회의록을 모두 확보하라. 목격자가 될 동료를 최소 2명 식별하고, 필요하면 그 자리에서 '이 아이디어는 제가 ○월 ○일에 처음 제안한 것입니다'라고 이메일로 재확인 발송해 타임스탬프를 박아 두어라. 상사가 부인할 수 없는 디지털 흔적을 다층으로 쌓는 것이 핵심이다." },
      { phase: "실행", color: C.phase2, body: "다음 관련 회의에서 선제적으로 '후속 발전안'을 공개 발표하라. 원본 아이디어의 연장선임을 명시하며 팀 채팅에도 동시 게시해 타임스탬프를 공식화하라. 그 자리에서 본부장·임원 등 윗선에게 직접 보고하는 루틴을 만들어 상사를 우회하는 보고 채널을 확보하라. 상사가 또 가로채려 하면 회의 중 즉각 '이 내용은 제가 ○일에 제안한 방향의 연장입니다'라고 전체가 듣는 앞에서 선언하라." },
      { phase: "프레이밍", color: C.phase3, body: "피해자 프레임을 완전히 버리고 '지식재산권 침해' 프레임으로 전환하라. 인사팀·윗선 보고 시 '업무 혁신 기여도'와 '아이디어 출처'를 데이터로 제시해 상사의 기여가 제로임을 공식 기록에 남겨라. 상사의 평판을 실력 없는 사람으로 조직 내에서 자연스럽게 굳히되, 본인은 항상 '성과 중심·사실 기반'으로만 말하라. 상사가 반박하면 할수록 증거가 더 부각되는 구조를 만드는 것이다." },
    ],
    phrases: [],
  },
  {
    id: "bully", icon: "🗡️", label: "견제·괴롭힘", hanja: "殘賊",
    quote: "인을 해치는 자를 적이라 하고, 의를 해치는 자를 잔이라 한다. — 양혜왕 하",
    strategy: [
      { phase: "명분 축적", color: C.phase1, body: "괴롭힘 행위를 법적 수준으로 기록하라. 날짜·시간·장소·발언 전문·목격자 이름을 육하원칙으로 매 건 즉시 문서화하라. 직장 내 괴롭힘 금지법(근로기준법 제76조의2) 위반 요건에 해당하는지 체크하라. 녹음이 합법인 환경이라면 반복적 언행을 녹취하라. 증거가 쌓일수록 상대의 리스크는 기하급수적으로 커진다." },
      { phase: "실행", color: C.phase2, body: "HR에 '공식 상담'을 신청하라. 비공식 하소연이 아닌 문서로 접수해 회사가 인지했다는 기록을 남겨라. 동시에 윗선(상사의 상사)에게 '업무 효율 저하' 명분으로 상황을 보고하라. 조직 내 2인 이상의 동조자를 확보해 집단 증언 구조를 만들어라. 회사가 묵인할 경우 고용노동부 진정 접수 또는 노무사 상담을 통해 외부 압력을 넣을 준비를 갖춰라." },
      { phase: "프레이밍", color: C.phase3, body: "상사를 '조직의 리스크'로 포지셔닝하라. '저 한 사람의 문제'가 아니라 '이 사람이 있으면 팀 전체가 법적·평판 리스크에 노출된다'는 프레임으로 경영진에게 인식시켜라. 성과로 본인의 체급을 키우면서 동시에 상사의 무능과 법적 리스크를 데이터로 지속 노출하라. 회사 입장에서 이 상사를 유지하는 비용이 제거하는 비용보다 크다는 계산이 나오면 조직이 스스로 움직인다." },
    ],
    phrases: [],
  },
  {
    id: "workload", icon: "⚖️", label: "불공평한 업무", hanja: "不義",
    quote: "군자는 힘으로 사람을 복종시키지 않고, 덕으로 사람을 복종시킨다.",
    strategy: [
      { phase: "명분 축적", color: C.phase1, body: "업무 불균형을 수치화하라. 본인 vs 팀원별 주간 업무량·야근 시간·담당 건수를 스프레드시트로 정리하고, 3개월치 데이터를 누적하라. 같은 처우에 불만인 동료를 최소 2명 확보해 집단 증언 구조를 만들어라. 숫자로 보여주면 '개인 불만'이 아니라 '구조적 문제'가 된다." },
      { phase: "실행", color: C.phase2, body: "새 업무 요청이 올 때마다 현재 업무 목록을 이메일로 첨부하고 '우선순위를 명시해달라'고 요청하라. 이를 통해 상사가 업무를 무한정 밀어넣는 행위를 공식 기록으로 만들어라. 3개월치 데이터가 쌓이면 HR 또는 윗선에 '번아웃 및 업무 효율 저하 우려'로 공식 보고하라. 본인이 무너지기 전에 문제를 조직 의제로 올리는 것이 핵심이다." },
      { phase: "프레이밍", color: C.phase3, body: "상사를 '인력 자원을 낭비하는 무능한 관리자'로 조직에 각인시켜라. '저만의 문제'가 아니라 '팀 생산성과 인재 이탈 리스크'로 의제를 확장하라. 동시에 본인이 처리한 성과를 수치로 가시화해 '이 사람이 이 팀의 실질적 엔진'임을 윗선에 인식시켜라. 상사가 없어도 팀이 돌아간다는 인식을 심는 순간, 상사의 존재 이유가 사라진다." },
    ],
    phrases: [],
  },
  {
    id: "ignore", icon: "🙉", label: "의견 무시", hanja: "壅蔽",
    quote: "간언을 막는 자는 나라를 망하게 하고, 간언하지 않는 신하는 그 공범이다.",
    strategy: [
      { phase: "명분 축적", color: C.phase1, body: "무시당한 의견과 그 결과를 쌍으로 기록하라. '내가 ○일에 이 리스크를 경고했고, 상사가 묵살했으며, 결국 ○의 손실이 발생했다'는 인과 구조를 데이터로 구축하라. 이메일·슬랙으로 의견을 제출해 타임스탬프를 남기고, 묵살 사실 자체도 회신 없음으로 기록하라. 반복될수록 상사의 판단력 결함이 누적 증거로 쌓인다." },
      { phase: "실행", color: C.phase2, body: "의견 제출 채널을 상사 위로 우회하라. 팀 회의에서 묵살당했다면 이후 윗선 보고 시 '제가 이전에 제안했던 내용인데 한번 더 공유드립니다'라며 자연스럽게 상위 채널에 올려라. 상사를 건너뛰는 것이 아니라 '조직 최선을 위한 보고'로 포장하라. 동료 2~3명의 지지를 사전에 확보해 회의에서 집단 의견으로 만들면 상사 혼자 막을 수 없어진다." },
      { phase: "프레이밍", color: C.phase3, body: "상사를 '조직의 성장을 막는 병목'으로 각인시켜라. 내 의견이 채택됐을 때의 성과는 크게 가시화하고, 무시됐다가 문제가 생긴 사례는 회고 미팅에서 데이터로 조용히 꺼내라. 감정 없이 사실만 나열해도 상사의 판단력이 얼마나 형편없는지가 드러난다. 윗선 입장에서 '이 팀장을 거치면 좋은 아이디어가 죽는다'는 인식이 자리잡으면, 그 사람의 보고 라인 자체가 형해화된다." },
    ],
    phrases: [],
  },
  {
    id: "credit", icon: "🏆", label: "성과 가로채기", hanja: "奪功",
    quote: "공이 있는 자에게 상을 주지 않으면, 선한 자들이 떠난다.",
    strategy: [
      { phase: "명분 축적", color: C.phase1, body: "모든 산출물에 내 이름과 날짜를 박아라. 문서 작성자, 코드 커밋 기록, 이메일 발신자가 모두 증거다. 프로젝트 기여도를 타임라인으로 정리해 '누가 언제 무엇을 했는가'를 반박 불가능한 형태로 구성하라. 공동 작업물이라면 내 파트가 명시된 문서를 별도로 생성해 윗선에 공유 기록을 남겨라." },
      { phase: "실행", color: C.phase2, body: "성과 발표는 반드시 내가 직접 하라. 발표 기회를 상사가 선점하려 하면 그 자리에서 '제가 직접 담당한 파트라 제가 설명드리겠습니다'라고 단호하게 치고 들어가라. 윗선에게 진행 상황을 정기적으로 직접 공유하는 1:1 또는 보고 루틴을 만들어 상사 없이도 기여가 윗선에 닿는 채널을 구축하라. 상사가 가로챌 여지 자체를 구조적으로 없애는 것이다." },
      { phase: "프레이밍", color: C.phase3, body: "상사가 성과를 가로챘다는 사실을 조직 내에 조용하지만 확실하게 유포하라. 동료들에게 '○○ 팀장이 발표했지만 실제로는 제가 ○부터 ○까지 다 했습니다'를 자연스러운 대화로 흘려라. 이것이 쌓이면 상사의 성과는 실체 없는 것으로 인식되고, 본인의 실력만 부각된다. 평가 시즌에는 기여 목록을 HR과 윗선에 직접 제출해 상사의 평가권을 우회하라." },
    ],
    phrases: [],
  },
  {
    id: "isolation", icon: "🚪", label: "따돌림·소외", hanja: "孤立",
    quote: "천시는 지리만 못하고, 지리는 인화만 못하다. — 공손추 하",
    strategy: [
      { phase: "명분 축적", color: C.phase1, body: "배제의 증거를 체계적으로 수집하라. 참석 명단에서 빠진 회의 목록, 정보가 공유되지 않은 사례, 업무 지시가 우회된 기록을 날짜별로 정리하라. 의도적 패턴이 반복된다면 이는 직장 내 따돌림으로 법적 요건을 충족할 수 있다. 기록은 나를 보호하는 동시에 상대를 압박하는 무기다." },
      { phase: "실행", color: C.phase2, body: "팀 내부가 아닌 조직 전체에서 영향력을 키워라. 타 팀 핵심 인물들과 협업하고, 사내 프로젝트·TF에 자원하며 팀 경계를 넘는 존재감을 만들어라. 팀장이 나를 배제해도 조직 전체에서 내 이름이 회자되면 배제의 효과가 사라진다. 동시에 상위 리더십과 직접 접점을 늘려 팀장을 우회하는 신뢰 라인을 구축하라." },
      { phase: "프레이밍", color: C.phase3, body: "배제를 역이용해 '조직 내 가장 넓은 네트워크를 가진 사람'이 되어라. 팀 안에서 소외될수록 팀 밖에서 인정받는 아이러니를 만들어라. 결정적 순간에 팀장보다 더 많은 조직 내 우군을 보유하면, 팀장의 배제 행위가 오히려 그의 소인배적 면모를 드러내는 증거가 된다. 인사 이동이나 평가 시즌에 상위 리더십이 어느 쪽 손을 들어줄지는 자명하다." },
    ],
    phrases: [],
  },
  {
    id: "eval", icon: "📋", label: "부당한 평가", hanja: "不正",
    quote: "어진 이를 등용하지 않고 능력 있는 자를 내치면, 나라가 텅 비게 된다.",
    strategy: [
      { phase: "명분 축적", color: C.phase1, body: "평가 기준 대비 성과를 반박 불가능한 수치로 정리하라. 같은 기준으로 더 낮은 성과를 낸 동료가 더 높은 평가를 받았다면, 그 데이터를 나란히 배치하라. 연간 칭찬 메시지·수상 기록·긍정 피드백을 전부 모아 '누가 봐도 고평가여야 할 근거'를 패키지로 구성하라. 감정이 아니라 숫자로 싸워야 이긴다." },
      { phase: "실행", color: C.phase2, body: "'개선 피드백 요청' 명분으로 평가자와 공식 면담을 잡아라. 면담 자리에서 준비한 성과 데이터를 조용히 꺼내놓고 '이 기준으로 제 평가가 어떻게 산출됐는지 설명해주시겠어요?'라고 물어라. 납득할 답을 못 하면 그 자리에서 HR 이의신청을 예고하라. 이후 HR에 성과 대조 자료를 첨부해 공식 이의를 제기하고, 필요시 노무사를 통해 부당 평가로 외부 압력을 가하라." },
      { phase: "프레이밍", color: C.phase3, body: "상사를 '편향된 평가로 조직 인재를 유실시키는 관리자'로 각인시켜라. HR과 윗선에게 이 평가가 개인 감정이나 관계에 의한 것임을 데이터로 보여주고, '이런 평가 문화가 지속되면 핵심 인재가 이탈한다'는 조직 리스크 프레임으로 확장하라. 본인이 퇴사나 이직을 암시하는 것만으로도 상위 리더십은 움직인다. 좋은 인재를 잃는 것은 회사 입장에서 상사 한 명 교체보다 훨씬 비싼 비용이다." },
    ],
    phrases: [],
  },
  {
    id: "blame", icon: "🎯", label: "책임 전가", hanja: "卸責",
    quote: "허물을 남에게 돌리는 자는 스스로를 작게 만드는 것이다.",
    strategy: [
      { phase: "명분 축적", color: C.phase1, body: "모든 지시를 이메일로 재확인해 증거를 선제적으로 확보하라. '말씀하신 대로 A 방향으로 진행하겠습니다, 맞나요?'라는 한 문장이 훗날 책임 소재를 가르는 결정적 증거가 된다. 리스크를 예감했다면 사전에 '이 방향은 ○○ 리스크가 있습니다'라고 서면으로 제기하고 상사의 '그래도 진행하라'는 답변을 확보하라. 문제 발생 시 이 기록이 면죄부가 된다." },
      { phase: "실행", color: C.phase2, body: "문제가 터지는 순간 즉각 사실 타임라인을 문서화해 HR·윗선에 공유하라. '저는 ○일 지시에 따라 진행했고, 우려를 사전에 제기했으나 묵살됐습니다'라는 구조로 명확히 보고하라. 감정 없이 사실만 나열하면 책임 소재가 자동으로 드러난다. 상사가 부인하면 이메일 증거를 그 자리에서 제시하라. 준비된 자 앞에서 거짓말은 무너진다." },
      { phase: "프레이밍", color: C.phase3, body: "상사를 '책임을 회피하는 비겁한 관리자'로 조직 내에 각인시켜라. 이번 사건을 계기로 윗선에게 '이 팀장 아래에서는 누구도 소신껏 일할 수 없다'는 인식을 심어라. 본인은 끝까지 침착하고 데이터 기반으로 대응해 대비를 더욱 선명하게 만들어라. 조직이 이 패턴을 인식하면, 다음번 문제가 터졌을 때 상사는 신뢰를 잃고 본인은 신뢰를 얻는 구조가 완성된다." },
    ],
    phrases: [],
  },
];

export default function App() {
  const [selectedId, setSelectedId] = useState("idea");
  const [animKey, setAnimKey] = useState(0);

  function select(id) {
    if (id === selectedId) return;
    setSelectedId(id);
    setAnimKey(k => k + 1);
  }

  const sit = SITUATIONS.find(s => s.id === selectedId);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "system-ui, -apple-system, sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
        .sit-card { transition: background 0.15s, border-color 0.15s, color 0.15s; }
        .sit-card:hover { background: ${C.surfaceHover} !important; }
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes stampIn {
          0%   { opacity: 0; transform: scale(1.5) rotate(-10deg); }
          65%  { opacity: 1; transform: scale(0.93) rotate(4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .panel-anim { animation: panelIn 0.28s cubic-bezier(0.22,1,0.36,1) forwards; }
        .stamp-anim { animation: stampIn 0.42s cubic-bezier(0.22,1,0.36,1) forwards; }
      `}</style>

      {/* ── Header ── */}
      <header style={{ padding: "18px 32px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
        <span style={{ fontFamily: "'Noto Serif KR',serif", fontSize: 17, fontWeight: 700, letterSpacing: "0.06em" }}>現代放伐論</span>
        <span style={{ width: 1, height: 16, background: C.border, display: "inline-block" }} />
        <span style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.14em" }}>직장 내 역성혁명 전략서</span>
      </header>

      {/* ── Situation cards (horizontal) ── */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "16px 28px", display: "flex", gap: 8, overflowX: "auto", flexShrink: 0 }}>
        {SITUATIONS.map(s => {
          const active = s.id === selectedId;
          return (
            <button key={s.id} className="sit-card" onClick={() => select(s.id)}
              style={{
                flexShrink: 0,
                padding: "10px 16px",
                background: active ? C.surface : "transparent",
                border: `1px solid ${active ? C.gold : C.border}`,
                borderRadius: 8,
                color: active ? C.text : C.textMid,
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                display: "flex",
                alignItems: "center",
                gap: 7,
                whiteSpace: "nowrap",
                position: "relative",
              }}>
              {active && (
                <span style={{
                  position: "absolute", bottom: -1, left: "50%", transform: "translateX(-50%)",
                  width: 24, height: 2, background: C.gold, borderRadius: 1,
                }} />
              )}
              <span style={{ fontSize: 15 }}>{s.icon}</span>
              {s.label}
            </button>
          );
        })}
      </div>

      {/* ── Main panel ── */}
      <div key={animKey} className="panel-anim" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Situation title row */}
        <div style={{ padding: "28px 36px 20px", borderBottom: `1px solid ${C.borderFaint}`, display: "flex", alignItems: "center", gap: 24 }}>
          {/* Stamp */}
          <div key={`stamp-${animKey}`} className="stamp-anim" style={{
            width: 60, height: 60, flexShrink: 0,
            border: `2px solid ${C.gold}`,
            borderRadius: 4,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 1, position: "relative",
          }}>
            <span style={{ fontSize: 7, color: C.textFaint, letterSpacing: 2, fontFamily: "'Noto Serif KR',serif" }}>判定</span>
            <span style={{ fontSize: 20, fontFamily: "'Noto Serif KR',serif", fontWeight: 700, color: C.gold, lineHeight: 1 }}>{sit.hanja}</span>
            {/* corner ticks */}
            {[[true,false,true,false],[true,false,false,true],[false,true,true,false],[false,true,false,true]].map(([bt,bb,bl,br],i) => (
              <span key={i} style={{
                position:"absolute",
                top: i<2?3:"auto", bottom: i>=2?3:"auto",
                left: i%2===0?3:"auto", right: i%2===1?3:"auto",
                width:5,height:5,
                borderTop: bt?`1px solid ${C.gold}`:"none",
                borderBottom: bb?`1px solid ${C.gold}`:"none",
                borderLeft: bl?`1px solid ${C.gold}`:"none",
                borderRight: br?`1px solid ${C.gold}`:"none",
              }}/>
            ))}
          </div>

          <div>
            <h2 style={{ fontFamily: "'Noto Serif KR',serif", fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 6 }}>
              {sit.icon} {sit.label}
            </h2>
            <p style={{ fontSize: 12, color: C.goldLight, fontStyle: "italic", fontFamily: "'Noto Serif KR',serif", lineHeight: 1.6 }}>
              "{sit.quote}"
            </p>
          </div>
        </div>

        {/* Strategy — vertical timeline */}
        <div style={{ flex: 1, padding: "32px 48px", overflowY: "auto" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.18em", color: C.textFaint, marginBottom: 28, textTransform: "uppercase" }}>방벌 전략</div>

          <div style={{ position: "relative", maxWidth: 640 }}>
            {/* connecting line */}
            <div style={{
              position: "absolute", left: 10, top: 10, bottom: 10, width: 1,
              background: `linear-gradient(to bottom, ${C.phase1}66, ${C.phase2}66, ${C.phase3}66)`,
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {sit.strategy.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 24 }}>
                  {/* node */}
                  <div style={{ flexShrink: 0, paddingTop: 1 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%",
                      border: `1.5px solid ${step.color}`, background: C.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: step.color }} />
                    </div>
                  </div>
                  {/* text */}
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: step.color, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>{step.phase}</div>
                    <p style={{ fontSize: 13, lineHeight: 1.9, color: C.textMid }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.borderFaint}`, padding: "9px 32px", textAlign: "center" }}>
        <span style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.08em" }}>
          본 전략서는 직장 스트레스 해소 목적입니다 · 실제 하극상의 결과는 본인 책임
        </span>
      </div>

    </div>
  );
}
