import AreaChartWidget from '../../components/dashboard/charts/AreaChartWidget'
import BarChartWidget from '../../components/dashboard/charts/BarChartWidget'
import ChartCard from '../../components/dashboard/charts/ChartCard'
import LineChartWidget from '../../components/dashboard/charts/LineChartWidget'
import PieChartWidget from '../../components/dashboard/charts/PieChartWidget'
import { SkeletonChart } from '../../components/dashboard/DashboardSkeletons'
import EmptyState from '../../components/dashboard/EmptyState'
import { useMockLoading } from '../../hooks/useMockLoading'
import analyticsData from '../../mock/analyticsData.json'

function DashboardAnalyticsPage() {
  const isLoading = useMockLoading(700)
  const hasData = analyticsData.searchesPerDay.length > 0

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <p className="eyebrow">Analytics</p>
        <h1>Usage at a glance.</h1>
        <p>Placeholder analytics based on mock data — real numbers will populate once the Python backend is connected.</p>
      </header>

      {isLoading ? (
        <div className="chart-grid">
          {Array.from({ length: 6 }, (_, index) => <SkeletonChart key={index} />)}
        </div>
      ) : !hasData ? (
        <EmptyState icon="▲" title="No analytics yet" description="Analytics will appear once search activity has been recorded." />
      ) : (
        <div className="chart-grid">
          <ChartCard title="Searches per day" description="Total search volume over the last two weeks.">
            <LineChartWidget data={analyticsData.searchesPerDay} xKey="date" yKey="searches" />
          </ChartCard>
          <ChartCard title="Response time trend" description="Average response time in milliseconds.">
            <AreaChartWidget data={analyticsData.responseTimeTrend} xKey="date" yKey="ms" unit="ms" />
          </ChartCard>
          <ChartCard title="Top countries" description="Search volume by country.">
            <BarChartWidget data={analyticsData.topCountries} xKey="name" yKey="searches" layout="vertical" />
          </ChartCard>
          <ChartCard title="Top languages" description="Search volume by response language.">
            <BarChartWidget data={analyticsData.topLanguages} xKey="name" yKey="searches" layout="vertical" />
          </ChartCard>
          <ChartCard title="Device usage" description="Share of searches by device type.">
            <PieChartWidget data={analyticsData.deviceUsage} />
          </ChartCard>
          <ChartCard title="Most used keywords" description="Most frequently searched terms.">
            <BarChartWidget data={analyticsData.topKeywords} xKey="keyword" yKey="count" layout="vertical" />
          </ChartCard>
        </div>
      )}
    </div>
  )
}

export default DashboardAnalyticsPage
