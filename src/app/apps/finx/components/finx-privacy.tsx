import Link from "next/link"
import { ArrowLeft, ShieldCheck } from "@phosphor-icons/react/dist/ssr"
import { Section } from "@/components/section"
import { FinxFooter, FinxHeader, LIME } from "./finx-chrome"

const EFFECTIVE = "25 June 2026"

const permissions = [
  {
    name: "Read SMS (RECEIVE_SMS / READ_SMS)",
    why: "Optional. When you enable automatic import, FinX reads incoming bank and bKash messages on your device to create matching transactions. Messages are parsed locally and never uploaded. Leave it disabled and FinX never touches your SMS.",
  },
  {
    name: "Photos / storage",
    why: "Only when you attach a receipt photo to a transaction, or export/import a backup file you choose. FinX does not scan your gallery.",
  },
  {
    name: "Biometrics (fingerprint / face)",
    why: "Optional unlock. Handled by Android's local authentication; FinX never receives or stores your biometric data.",
  },
]

export function FinxPrivacy() {
  return (
    <>
      <FinxHeader />

      <main id="top">
        <Section className="pt-28 md:pt-36">
          <Link
            href="/apps/finx"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} weight="bold" />
            Back to FinX
          </Link>

          <div className="mt-8 flex flex-col gap-5">
            <div
              className="flex size-11 items-center justify-center border"
              style={{
                backgroundColor: "#9FE8701a",
                borderColor: "#9FE87033",
                color: LIME,
              }}
            >
              <ShieldCheck size={20} weight="bold" />
            </div>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Effective {EFFECTIVE}
            </p>
          </div>

          {/* The short version */}
          <div
            className="mt-10 border p-6 md:p-8"
            style={{ backgroundColor: "#9FE8700d", borderColor: "#9FE87026" }}
          >
            <h2 className="text-lg font-bold tracking-tight">In short</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              FinX is a local-only app. It has no account, no backend, no cloud
              and no analytics. Everything you enter — wallets, transactions,
              people, receipts — stays on your device. Nothing is ever sent to
              the developer or any third party. The only data that leaves your
              phone is a backup file that <em>you</em> choose to export.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-10">
            <Policy title="Who this applies to">
              <p>
                This policy covers the FinX Android app (&ldquo;the app&rdquo;)
                published at{" "}
                <a
                  href="https://github.com/shahriyardx/finx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  github.com/shahriyardx/finx
                </a>
                . It is a personal-finance tracker that runs entirely on your
                device.
              </p>
            </Policy>

            <Policy title="Data we collect">
              <p>
                None. FinX does not collect, transmit or sell any personal
                information. There are no accounts to create and no servers to
                sign in to. The developer has no access to your data.
              </p>
            </Policy>

            <Policy title="Data you create, and where it lives">
              <p>
                Wallets, income and expenses, transfers, lending and borrowing
                records, people, notes and attached receipt photos are stored in
                a local database on your device (SQLite via Drizzle ORM). Your
                PIN is kept in the Android secure store. This data never leaves
                the device unless you export it yourself.
              </p>
            </Policy>

            <Policy title="Bank SMS import">
              <p>
                If you turn on automatic import, FinX reads incoming SMS to
                recognise transactions from supported senders — currently City
                Bank, Standard Chartered and bKash — and adds them for you.
                bKash messages are auto-labelled (Cash In, Cash Out, Send Money,
                Remittance, Bill Payment, Cashback and similar).
              </p>
              <p>
                All parsing happens on-device, in real time, only to fill in
                transactions. Message contents are never uploaded, logged
                remotely or shared. This feature is optional and off unless you
                enable it; you can revoke the SMS permission at any time in
                Android settings.
              </p>
            </Policy>

            <Policy title="Permissions">
              <ul className="flex flex-col gap-4">
                {permissions.map((p) => (
                  <li key={p.name} className="border p-5">
                    <p className="font-semibold tracking-tight">{p.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.why}
                    </p>
                  </li>
                ))}
              </ul>
            </Policy>

            <Policy title="Backup & restore">
              <p>
                You can export a full JSON backup and restore from one. These
                files are created and read only when you ask, and they go
                wherever you choose to save or share them. Once a backup leaves
                the app it is outside FinX&rsquo;s control, so store it
                somewhere you trust.
              </p>
            </Policy>

            <Policy title="Third parties, analytics & ads">
              <p>
                There are none. FinX contains no advertising, no analytics or
                crash-reporting SDKs, and no third-party trackers. It makes no
                network requests with your financial data.
              </p>
            </Policy>

            <Policy title="Data retention & deletion">
              <p>
                Your data stays until you remove it. You can delete individual
                records inside the app, reset all data from Settings, or
                uninstall the app to erase its local database and stored PIN.
                Because nothing is held on a server, there is nothing for the
                developer to delete on your behalf.
              </p>
            </Policy>

            <Policy title="Children">
              <p>
                FinX is a general-purpose finance tool and is not directed at
                children. Since it collects no data, it does not knowingly
                gather information from anyone, including children.
              </p>
            </Policy>

            <Policy title="Changes to this policy">
              <p>
                If this policy changes, the updated version will be published
                with a new effective date in the app&rsquo;s repository.
                Material changes will be noted there.
              </p>
            </Policy>

            <Policy title="Contact">
              <p>
                Questions about privacy? Open an issue at{" "}
                <a
                  href="https://github.com/shahriyardx/finx/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  github.com/shahriyardx/finx/issues
                </a>
                .
              </p>
            </Policy>
          </div>
        </Section>
      </main>

      <FinxFooter />
    </>
  )
}

function Policy({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
      <div className="flex max-w-2xl flex-col gap-3 leading-relaxed text-muted-foreground [&_em]:not-italic [&_em]:text-foreground">
        {children}
      </div>
    </section>
  )
}
