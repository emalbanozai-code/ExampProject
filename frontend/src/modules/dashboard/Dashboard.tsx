import { useTranslation } from "react-i18next"

function Dashboard() {
const { t } = useTranslation()
  return (
    <div className='text-4xl'>{t("dashboard.welcome")}</div>
  )
}

export default Dashboard