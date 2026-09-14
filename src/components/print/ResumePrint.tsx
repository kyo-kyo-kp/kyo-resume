import React from 'react';
import { useContent, useLocale, useStrings } from '../../i18n/LocaleContext';
import { education, experiences } from '../../data/resumeData';

/**
 * 인쇄(PDF 저장) 전용 2장 사이드바형 이력서.
 * 왼쪽 밴드: 이름·직함·연락·사이트 QR·사실·기술·학력·자격. 오른쪽: 한 줄 가치 → 경력 아크 → 대표 성과 4 → 경력(역할당 2~3줄).
 * 서사·다이어그램·케이스 본문은 사이트로 보낸다. 화면에서는 .print-only 로 숨긴다.
 */
const monthsBetween = (a: Date, b: Date): number => (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());

const parseYm = (s: string, fallback: Date): Date => {
  const m = s.trim().match(/^(\d{4})\.(\d{2})$/);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, 1) : fallback;
};

const stripProtocol = (url: string): string => decodeURIComponent(url).replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const LEAD_SINCE = new Date(2026, 0, 1);

const ResumePrint: React.FC = () => {
  const { profile, stack, chapters, resume } = useContent();
  const { locale } = useLocale();
  const s = useStrings();
  const now = new Date();
  const start = new Date(profile.careerStart);
  const totalMonths = Math.max(1, monthsBetween(start, now));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // 경력 아크: 3막의 기간을 비율로
  const arc = chapters.map((ch) => {
    const [from, to] = ch.period.split('–').map((p) => p.trim());
    const a = parseYm(from, start);
    const b = parseYm(to, now);
    return { id: ch.id, title: ch.title, from, to, pct: (Math.max(1, monthsBetween(a, b)) / totalMonths) * 100 };
  });
  const leadPct = (monthsBetween(start, LEAD_SINCE) / totalMonths) * 100;

  const companyLabel = (company: string): string => {
    for (const ch of chapters) {
      const i = ch.companies.indexOf(company);
      if (i >= 0 && ch.companyLabels?.[i]) return ch.companyLabels[i];
    }
    return company;
  };
  const linkedIn = profile.links.find((l) => l.label.toLowerCase().includes('linkedin'));

  return (
    <div className="print-only rp rp-side-layout" aria-hidden>
      <div className="rp-side-bg" />

      <aside className="rp-side">
        <div className="rp-side-block rp-identity">
          <h1 className="rp-name">{locale === 'ko' ? profile.name : profile.nameEn}</h1>
          <div className="rp-name-sub">{locale === 'ko' ? profile.nameEn : profile.name}</div>
          <div className="rp-title">{profile.title}</div>
        </div>

        <div className="rp-side-block">
          <h3>{s.print.contact}</h3>
          <div className="rp-contact-line">{profile.email}</div>
          {linkedIn && <div className="rp-contact-line">{stripProtocol(linkedIn.url)}</div>}
          <div className="rp-contact-line">{profile.location}</div>
        </div>

        {profile.siteUrl && (
          <div className="rp-side-block rp-more">
            <h3>{s.print.more}</h3>
            <img className="rp-qr-img" src={`${process.env.PUBLIC_URL}/qr-site.svg`} alt="" />
            <div className="rp-more-note">{resume.detailNote}</div>
            <div className="rp-more-url">
              <span className="rp-muted">{s.print.scan}</span> {stripProtocol(profile.siteUrl)}
            </div>
          </div>
        )}

        <div className="rp-side-block">
          <ul className="rp-facts">
            <li>{s.journey.careerTotal(years, months)}</li>
            {resume.keyFacts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="rp-side-block">
          <h3>{s.print.skills}</h3>
          {stack.map((g) => (
            <div key={g.domain} className="rp-skill">
              <div className="rp-skill-domain">
                {g.domain}
                {g.note && <span className="rp-skill-flag">*</span>}
              </div>
              {g.operates.length > 0 && <div className="rp-skill-line">{g.operates.join(' · ')}</div>}
              {g.uses.length > 0 && <div className="rp-skill-line rp-muted">{g.uses.join(' · ')}</div>}
            </div>
          ))}
          {stack.some((g) => g.note) && <div className="rp-skill-note">* {stack.find((g) => g.note)?.note}</div>}
        </div>

      </aside>

      <main className="rp-main">
        <p className="rp-lead">{profile.tagline}</p>

        <div className="rp-arc">
          <div className="rp-arc-bar">
            {arc.map((a, i) => (
              <div key={a.id} style={{ flexBasis: `${a.pct}%` }} className={`rp-arc-seg rp-arc-seg-${i}`}>
                <span className="rp-arc-year">{a.from.slice(0, 4)}</span>
              </div>
            ))}
            <div className="rp-arc-marker" style={{ left: `${leadPct}%` }}>
              <span>{s.print.lead} 2026.01</span>
            </div>
          </div>
          <div className="rp-arc-legend">
            {arc.map((a, i) => (
              <div key={a.id} className="rp-arc-item">
                <span className={`rp-arc-dot rp-arc-seg-${i}`} />
                <span className="rp-arc-title">{a.title}</span>
                <span className="rp-arc-period">
                  {a.from} – {a.to}
                </span>
              </div>
            ))}
          </div>
        </div>

        <section className="rp-section">
          <h2>{s.print.headlines}</h2>
          <ol className="rp-headlines">
            {resume.headlines.map((h, i) => (
              <li key={h.title}>
                <span className="rp-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="rp-headline-title">{h.title}</div>
                  <div className="rp-headline-detail">{h.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rp-section">
          <h2>{s.print.experience}</h2>
          {experiences.map((e) => (
            <article key={e.id} className="rp-item">
              <div className="rp-row">
                <strong>{companyLabel(e.company)}</strong>
                <span className="rp-muted">{e.position}</span>
                <span className="rp-period">{e.period}</span>
              </div>
              <ul className="rp-list">
                {(e.summaryBullets ?? e.milestones?.map((m) => `${m.date} ${m.text}`) ?? e.achievements ?? []).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>


        <section className="rp-section">
          <h2>{s.print.education}</h2>
          {education.map((ed) => (
            <div key={ed.id} className="rp-row">
              <strong>{ed.school}</strong>
              <span className="rp-muted">
                {ed.field} · {ed.degree}
              </span>
              <span className="rp-period">{ed.period}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ResumePrint;
