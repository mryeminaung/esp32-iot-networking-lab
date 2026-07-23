import { useDashboardStore } from "@/store/dashboard"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="text-center px-6 py-8 text-[0.8125rem] text-slate-400 dark:text-slate-500">
      <p>
        © {year} ECE 5000 Capstone Project · Developed by{" "}
        <a
          href="https://github.com/mryeminaung"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 no-underline font-semibold hover:underline"
        >
          @mryeminaung
        </a>
      </p>
    </footer>
  )
}
