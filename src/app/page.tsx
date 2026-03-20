import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  MessageCircle,
  TrendingUp,
  Smartphone,
  FileText,
  Package,
  Users,
  Map,
  UserCheck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const demos = [
  {
    slug: "sell-out",
    name: "Galletas Crunch",
    industry: "CPG / Retail",
    solutionType: "Sell-Out Analytics",
    problem:
      "Marca de galletas sin visibilidad de ventas en 26 tiendas. Desabastos detectados dias despues.",
    aiMoment:
      "IA genera briefing ejecutivo para junta con comprador",
    icon: BarChart3,
    accent: "text-blue-600",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-100",
    ready: true,
  },
  {
    slug: "chatbot",
    name: "AutoPartes Express",
    industry: "Autopartes",
    solutionType: "Chatbot WhatsApp con IA",
    problem:
      "40% de consultas perdidas fuera de horario. Vendedores saturados con preguntas repetitivas.",
    aiMoment:
      "Bot cotiza autopartes a las 11PM y genera link de pago",
    icon: MessageCircle,
    accent: "text-emerald-600",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-100",
    ready: true,
  },
  {
    slug: "forecasting",
    name: "FreshMex",
    industry: "Restaurantes",
    solutionType: "Prediccion de Demanda",
    problem:
      "Cadena de restaurantes desperdicia 20% de ingredientes o se queda sin platillos en horas pico.",
    aiMoment:
      "Predice demanda del viernes por partido de futbol + quincena",
    icon: TrendingUp,
    accent: "text-orange-600",
    accentBg: "bg-orange-50",
    accentBorder: "border-orange-100",
    ready: true,
  },
  {
    slug: "field-sales",
    name: "DistribuGo",
    industry: "Distribucion de Bebidas",
    solutionType: "App Movil Vendedores",
    problem:
      "12 vendedores, 300 tienditas, ordenes en papel. Sin visibilidad de cobertura ni rutas optimizadas.",
    aiMoment:
      "IA sugiere pedido ideal para cada tiendita basado en historial",
    icon: Smartphone,
    accent: "text-cyan-600",
    accentBg: "bg-cyan-50",
    accentBorder: "border-cyan-100",
    ready: true,
  },
  {
    slug: "automations",
    name: "ConstruPlan",
    industry: "Construccion",
    solutionType: "Reportes y Alertas Automaticas",
    problem:
      "Constructora con 4 proyectos sin control de costos. PM hace reportes manuales cada viernes.",
    aiMoment:
      "Reporte ejecutivo auto-generado aparece lunes a las 6AM",
    icon: FileText,
    accent: "text-amber-600",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-100",
    ready: true,
  },
  {
    slug: "inventory",
    name: "MediStock",
    industry: "Farmacias",
    solutionType: "Inventario Inteligente",
    problem:
      "3 farmacias pierden dinero por medicamentos caducados y picos estacionales impredecibles.",
    aiMoment:
      "Detecta temporada de dengue y ajusta reorden de antifebriles",
    icon: Package,
    accent: "text-violet-600",
    accentBg: "bg-violet-50",
    accentBorder: "border-violet-100",
    ready: true,
  },
  {
    slug: "crm",
    name: "VentaMax",
    industry: "Manufactura Industrial",
    solutionType: "CRM con IA",
    problem:
      "Fabricante con 200 cuentas en Excel. No saben que clientes estan en riesgo de irse.",
    aiMoment:
      "Predice churn de cliente y redacta email de seguimiento",
    icon: Users,
    accent: "text-rose-600",
    accentBg: "bg-rose-50",
    accentBorder: "border-rose-100",
    ready: true,
  },
  {
    slug: "agro",
    name: "AgroVista",
    industry: "Agricultura",
    solutionType: "Inteligencia de Cultivos",
    problem:
      "500 hectareas sin monitoreo digital. Problemas detectados cuando ya se extendieron.",
    aiMoment:
      "Alerta riesgo de helada y recomienda activar riego en parcelas especificas",
    icon: Map,
    accent: "text-teal-600",
    accentBg: "bg-teal-50",
    accentBorder: "border-teal-100",
    ready: true,
  },
  {
    slug: "hr",
    name: "GrupoNova",
    industry: "Manufactura",
    solutionType: "Prediccion de Rotacion",
    problem:
      "280 empleados, 23% de rotacion anual. RRHH se entera de renuncias cuando ya es tarde, $4.2M en costos de reemplazo.",
    aiMoment:
      "Predice que empleados renunciaran en 30-60 dias y recomienda acciones de retencion",
    icon: UserCheck,
    accent: "text-indigo-600",
    accentBg: "bg-indigo-50",
    accentBorder: "border-indigo-100",
    ready: true,
  },
];

export default function PortfolioHome() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Notion style: simple, clean border */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/60">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/rushdata-logo.png"
              alt="RushData"
              width={24}
              height={24}
              className="rounded"
            />
            <span className="text-sm font-semibold text-neutral-900">RushData</span>
            <span className="text-neutral-300">/</span>
            <span className="text-sm text-neutral-500">Demos</span>
          </div>
          <a
            href="https://www.rushdata.com.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            rushdata.com.mx
          </a>
        </div>
      </header>

      {/* Hero - Notion style: lots of white space, large clean type */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-2xl">
          <h1 className="text-[40px] leading-[1.15] font-bold text-neutral-900 tracking-tight">
            Soluciones de IA para problemas reales
          </h1>
          <p className="text-lg text-neutral-500 mt-4 leading-relaxed">
            9 demos interactivos. Cada uno muestra como la inteligencia artificial
            resuelve un problema de negocio en una industria diferente.
          </p>
          <p className="text-sm text-neutral-400 mt-2">
            Datos ficticios, soluciones reales.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-neutral-200" />
      </div>

      {/* Demo List - Notion style: clean rows, no heavy cards */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-3">
          {demos.map((demo) => {
            const Icon = demo.icon;

            return (
              <Link
                key={demo.slug}
                href={`/demos/${demo.slug}`}
                className="group block"
              >
                <div className="flex items-start gap-5 p-5 rounded-xl border border-transparent hover:border-neutral-200 hover:bg-neutral-50/50 transition-all duration-200">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg ${demo.accentBg} ${demo.accentBorder} border flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${demo.accent}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-base font-semibold text-neutral-900 group-hover:text-neutral-700">
                        {demo.name}
                      </h2>
                      <span className={`text-xs font-medium ${demo.accent}`}>
                        {demo.solutionType}
                      </span>
                      <span className="text-[11px] text-neutral-400 border border-neutral-200 rounded px-1.5 py-0.5">
                        {demo.industry}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {demo.problem}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2.5">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-neutral-500">
                        <span className="font-medium text-neutral-600">Momento IA:</span>{" "}
                        {demo.aiMoment}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                    <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer - minimal */}
      <footer className="border-t border-neutral-200">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/rushdata-logo-gris.png"
              alt="RushData"
              width={18}
              height={18}
              className="rounded opacity-40"
            />
            <p className="text-xs text-neutral-400">
              RushData · Tecnologia a tu medida, potenciada con IA
            </p>
          </div>
          <div className="flex items-center gap-5 text-xs text-neutral-400">
            <a
              href="mailto:mario@rushdata.com.mx"
              className="hover:text-neutral-600 transition-colors"
            >
              mario@rushdata.com.mx
            </a>
            <a
              href="https://www.rushdata.com.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-600 transition-colors"
            >
              rushdata.com.mx
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
