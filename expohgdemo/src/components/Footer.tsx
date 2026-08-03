export function Footer() {
  const fullDate = new Date;
  const year= fullDate.getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__marks" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>© {year} Haralamb Georgescu</span>
        <span>Bucharest, Romania</span>
      </div>
    </footer>
  )
}
