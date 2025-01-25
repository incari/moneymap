import { useLanguage } from "../contexts/LanguageContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const References = () => {
  const { t } = useLanguage()

  const references = [
    {
      title: "Precio medio de la vivienda en España",
      url: "https://www.idealista.com/sala-de-prensa/informes-precio-vivienda/",
      description: "Informe sobre la evolución del precio de la vivienda en España",
    },
    {
      title: "Gastos asociados a la compra de una vivienda",
      url: "https://www.helpmycash.com/hipotecas/gastos-compra-vivienda/",
      description: "Guía detallada sobre los gastos asociados a la compra de una vivienda en España",
    },
    {
      title: "Rentabilidad de los fondos indexados",
      url: "https://www.finect.com/usuario/Josetrecet/articulos/rentabilidad-fondos-indexados",
      description: "Análisis de la rentabilidad histórica de los fondos indexados",
    },
    {
      title: "¿Qué es FIRE?",
      url: "https://www.businessinsider.es/que-es-movimiento-fire-como-funciona-479599",
      description: "Explicación del movimiento FIRE (Independencia Financiera, Retiro Anticipado)",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("references")}</CardTitle>
        <CardDescription>{t("referencesDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {references.map((ref, index) => (
            <li key={index}>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border rounded-lg hover:bg-gray-50"
              >
                <h4 className="font-semibold text-blue-600">{ref.title}</h4>
                <p className="text-sm text-gray-600">{ref.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

