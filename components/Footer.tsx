export default function Footer() {
  const name = process.env.FOOTER_NAME || "Your Name"
  const gh = process.env.FOOTER_GITHUB || "#"
  const li = process.env.FOOTER_LINKEDIN || "#"
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800">
      <div className="container py-6 text-sm flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between">
        <div>© {new Date().getFullYear()} EventEase</div>
        <div className="opacity-70">Built by <a className="underline" href={gh} target="_blank" rel="noreferrer">{name}</a></div>
        <div className="flex gap-3">
          <a className="underline" href={gh} target="_blank" rel="noreferrer">GitHub</a>
          <a className="underline" href={li} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
