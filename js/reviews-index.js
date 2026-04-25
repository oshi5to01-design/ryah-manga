/* Single source of truth for all review metadata.
   Add one entry here each time a new review page is created. */

const REVIEWS = [
  {
    slug: "death-note",
    title: "デスノート",
    titleRomaji: "DEATH NOTE",
    titleEn: "Death Note",
    author: "大場つぐみ / 小畑健",
    genre: ["shounen", "thriller", "psychological"],
    genreLabels: ["サスペンス", "心理スリラー"],
    status: "completed",
    volumes: "全12巻",
    publishedDate: "2026-04-23",
    coverImg: "/img/covers/death-note.jpg",
    excerpt: "人生ナンバーワンのマンガ。読み始めたら止まれない、寝られない。2000冊以上読んできた中で、これを超える読書体験にまだ出会っていない。",
    pull: "明日のことを忘れて一気読みしてしまった——あの体験を、これ以降まだ塗り替えられていない。"
  },
  {
    slug: "kingdom",
    title: "キングダム",
    titleRomaji: "KINGDOM",
    titleEn: "Kingdom",
    author: "原泰久",
    genre: ["seinen", "historical", "action"],
    genreLabels: ["歴史", "戦記"],
    status: "ongoing",
    volumes: "70巻+ 連載中",
    publishedDate: "2026-04-23",
    coverImg: "/img/covers/kingdom.jpg",
    excerpt: "ここ数年で一番読み返している漫画。合従軍編・蕞の戦いが熱すぎて、何度読み返しても毎度面白い。羌瘣がつよかわいい。",
    pull: "ほぼ詰んだ状況からの反転攻勢が、何回読み返しても毎回熱くなる。"
  },
  {
    slug: "hunter-x-hunter",
    title: "ハンターハンター",
    titleRomaji: "HUNTER×HUNTER",
    titleEn: "Hunter × Hunter",
    author: "冨樫義博",
    genre: ["shounen", "action", "battle"],
    genreLabels: ["バトル", "冒険"],
    status: "ongoing",
    volumes: "37巻+ 連載中",
    publishedDate: "2026-04-23",
    coverImg: "/img/covers/hunter-x-hunter.jpg",
    excerpt: "念能力が出てきてから別次元に面白い。自分と向き合い、自分だけの能力を定めていく思慮深さに惹かれる。キメラアント編は賛しかない、涙ちょちょぎれる。",
    pull: "「賛否がある」と言われるが、自分の中には賛しかない。"
  },
  {
    slug: "slam-dunk",
    title: "スラムダンク",
    titleRomaji: "SLAM DUNK",
    titleEn: "Slam Dunk",
    author: "井上雄彦",
    genre: ["shounen", "sports"],
    genreLabels: ["スポーツ", "バスケ"],
    status: "completed",
    volumes: "全31巻",
    publishedDate: "2024-01-01",
    coverImg: "/img/covers/slam-dunk.jpg",
    excerpt: "バスケットボールを知らなくても心が震える。マンガという表現の可能性を最大限に引き出した、まぎれもない傑作。",
    pull: "山王工業戦。あれを超える試合描写をマンガで読んだことがない。"
  }
];

/* Render an editorial review card */
function renderReviewCard(r, opts = {}) {
  const featured = opts.featured === true;
  const genreLine = (r.genreLabels || []).join(' / ');
  const pullBlock = featured && r.pull
    ? `<blockquote class="review-card__pull">${r.pull}</blockquote>`
    : '';
  return `
    <article class="review-card${featured ? ' featured' : ''}">
      <a href="/reviews/${r.slug}/" class="review-card__link">
        <div class="review-card__genre">${genreLine}</div>
        <h3 class="review-card__title">${r.title}</h3>
        <p class="review-card__en">${r.titleEn || r.titleRomaji}</p>
        <p class="review-card__excerpt">${r.excerpt}</p>
        ${pullBlock}
        <div class="review-card__foot">
          <span class="review-card__author">${r.author}</span>
          <span class="review-card__sep">●</span>
          <span class="review-card__vols">${r.volumes}</span>
          <span class="review-card__arrow">→</span>
        </div>
      </a>
    </article>`;
}

/* Render a small related-card */
function renderRelatedCard(r) {
  const genreLine = (r.genreLabels || []).join(' / ');
  return `
    <article class="related-card">
      <a href="/reviews/${r.slug}/" class="related-card__link">
        <div class="related-card__genre">${genreLine}</div>
        <h3 class="related-card__title">${r.title}</h3>
        <p class="related-card__en">${r.titleEn || r.titleRomaji}</p>
        <div class="related-card__foot">
          <span class="related-card__vols">${r.volumes}</span>
          <span class="related-card__arrow">→</span>
        </div>
      </a>
    </article>`;
}

function genreLabel(slug) {
  const map = {
    shounen: '少年', shoujo: '少女', seinen: '青年', josei: '女性',
    sports: 'スポーツ', isekai: '異世界', romance: '恋愛',
    action: 'アクション', mystery: 'ミステリー', horror: 'ホラー',
    comedy: 'ギャグ', fantasy: 'ファンタジー', scifi: 'SF',
    slice_of_life: '日常', historical: '歴史',
    thriller: 'サスペンス', psychological: '心理', battle: 'バトル'
  };
  return map[slug] || slug;
}

/* Render the homepage editorial grid: 1 featured + others */
function renderEditorialGrid(targetId, reviews) {
  const el = document.getElementById(targetId);
  if (!el || !reviews.length) return;
  const [featured, ...rest] = reviews;
  el.innerHTML = renderReviewCard(featured, { featured: true })
    + rest.map(r => renderReviewCard(r)).join('');
}

/* Render a related-card grid */
function renderReviewGrid(targetId, reviews) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = reviews.map(renderRelatedCard).join('');
}
