import { Link } from 'react-router-dom'
import ActivityTimeline from '../../components/dashboard/ActivityTimeline'
import { SkeletonChart, SkeletonStatCard } from '../../components/dashboard/DashboardSkeletons'
import EmptyState from '../../components/dashboard/EmptyState'
import StatCard from '../../components/dashboard/StatCard'
import { ROUTES } from '../../constants/routes'
import { useMockLoading } from '../../hooks/useMockLoading'
import activityFeed from '../../mock/activityFeed.json'
import dashboardStats from '../../mock/dashboardStats.json'

const STAT_CARDS = [
  { key: 'totalSearches', icon: '⌕', label: 'Total Searches' },
  { key: 'todaySearches', icon: '☉', label: "Today's Searches" },
  { key: 'successfulRequests', icon: '✓', label: 'Successful Requests' },
  { key: 'avgResponseTime', icon: '⧗', label: 'Avg Response Time' },
  { key: 'countriesUsed', icon: '🌐', label: 'Countries Used' },
]

function DashboardOverviewPage() {
  const isLoading = useMockLoading(600)

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <p className="eyebrow">Dashboard</p>
        <h1>Welcome back.</h1>
        <p>A snapshot of your Custom SERP API usage. Figures below are mock data for this preview.</p>
      </header>

      <div className="stat-card-grid">
        {isLoading
          ? Array.from({ length: STAT_CARDS.length }, (_, index) => <SkeletonStatCard key={index} />)
          : STAT_CARDS.map((card) => {
            const stat = dashboardStats[card.key]
            return <StatCard key={card.key} icon={card.icon} label={card.label} value={stat.value} delta={stat.delta} trend={stat.trend} />
          })}
      </div>

      <section className="dashboard-panel">
        <div className="dashboard-panel__header">
          <h2>Recent Activity</h2>
          <Link to={ROUTES.dashboardHistory}>View history</Link>
        </div>
        {isLoading ? <SkeletonChart /> : activityFeed.length > 0
          ? <ActivityTimeline items={activityFeed.slice(0, 5)} />
          : <EmptyState icon="⟲" title="No recent activity" description="Activity will appear here as you use the dashboard." />}
      </section>
    </div>
  )
}

export default DashboardOverviewPage
