import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/padaria-hero.jpg";
import "../site/bakery.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Padaria System X — Pães artesanais todos os dias" },
      { name: "description", content: "Pães, bolos e doces artesanais feitos diariamente na Padaria System X." },
      { property: "og:title", content: "Padaria System X — Pães artesanais" },
      { property: "og:description", content: "Pães, bolos e doces artesanais feitos diariamente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const produtos = [
  { n: "Pão de Fermentação Natural", d: "Casca crocante, miolo aerado.", p: "R$ 18,00" },
  { n: "Croissant na Manteiga", d: "Folhado leve e amanteigado.", p: "R$ 9,00" },
  { n: "Baguete Tradicional", d: "Receita francesa, assada na hora.", p: "R$ 8,50" },
  { n: "Bolo de Cenoura", d: "Com cobertura de chocolate.", p: "R$ 32,00" },
];

function Index() {
  return (
    <div className="bk">
      <nav className="bk-nav">
        <div className="bk-logo">System <span>X</span></div>
        <ul>
          <li><a href="#produtos">Produtos</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
      <section className="bk-hero">
        <div>
          <h1>Pão quentinho, <em>feito com calma</em>.</h1>
          <p>Na Padaria System X, cada fornada nasce de fermentação lenta, farinha selecionada e muito carinho. Venha sentir o cheiro.</p>
          <a className="bk-btn" href="#produtos">Ver produtos</a>
        </div>
        <img src={hero} alt="Balcão da padaria com pães artesanais" />
      </section>
      <section id="produtos" className="bk-sec">
        <h2>Nossos favoritos</h2>
        <div className="bk-grid">
          {produtos.map((x) => (
            <div className="bk-card" key={x.n}>
              <h3>{x.n}</h3>
              <p>{x.d}</p>
              <div className="bk-price">{x.p}</div>
            </div>
          ))}
        </div>
      </section>
      <section id="sobre" className="bk-sec">
        <h2>Sobre nós</h2>
        <p style={{ fontFamily: "system-ui,sans-serif", lineHeight: 1.7, maxWidth: 700, color: "#5a4636" }}>
          Somos uma padaria de bairro que acredita no tempo certo das coisas. Nossos pães descansam por até 24 horas antes de irem ao forno.
        </p>
      </section>
      <section id="contato" className="bk-sec bk-info">
        <div className="bk-grid">
          <div><strong>Horário</strong>Seg a Sáb: 6h às 20h<br />Dom: 7h às 13h</div>
          <div><strong>Endereço</strong>Rua das Flores, 123<br />Centro</div>
          <div><strong>Contato</strong>(11) 0000-0000<br />contato@systemx.com</div>
        </div>
      </section>
      <footer className="bk-foot">© 2026 Padaria System X</footer>
    </div>
  );
}
