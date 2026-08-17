import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { UserRound } from "lucide-react";
import { getTeam } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Team | Anupam Health Care Services",
  description:
    "Meet the nurses, GDA staff, and physiotherapists behind Anupam Health Care Services in Ghaziabad.",
};

export default async function OurTeamPage() {
  const team = await getTeam().catch(() => []);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-brand-sky/40 px-5 py-14 text-center md:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
          Our team
        </p>
        <h1 className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">
          The people behind your care
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
          Every staff member is verified, trained, and chosen for the same
          quality: genuine care.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pt-10 md:px-8">
        <div className="relative h-56 overflow-hidden rounded-2xl shadow-card sm:h-72">
          <Image
            src="/images/nurse-patient-care.png"
            alt="Anupam Health Care team caring for a patient"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 md:px-8">
        {team.length === 0 ? (
          <p className="text-center text-sm text-gray-400">Team details coming soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {team.map((member) => (
              <div
                key={member.id}
                className="flex gap-4 rounded-2xl border border-gray-100 p-6 shadow-card"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-navy overflow-hidden">
                  {member.image ? (
                    <Image src={member.image} alt={member.name} width={56} height={56} className="object-cover" />
                  ) : (
                    <UserRound size={24} className="text-white" />
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {member.name}
                  </p>
                  <p className="text-xs font-medium text-brand-green">
                    {member.role}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
