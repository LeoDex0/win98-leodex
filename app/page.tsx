export default function Home() {
  return (
    <div className="p-8" style={{ background: 'var(--desktop-teal)' }}>
      <div className="window" style={{ width: 300 }}>
        <div className="title-bar">
          <div className="title-bar-text">Cascade check</div>
          <div className="title-bar-controls">
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body">
          <button type="button">Test button</button>
          <a href="#" className="win98-btn ml-2">
            Test link
          </a>
        </div>
      </div>
    </div>
  )
}
