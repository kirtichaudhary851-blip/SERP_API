import { DEVICE_OPTIONS, RESULT_COUNT_OPTIONS } from '../../constants/searchConstants'
import { THEME_MODES } from '../../constants/theme'
import { useDashboardSettings } from '../../hooks/useDashboardSettings'
import { useTheme } from '../../hooks/useTheme'
import { useToast } from '../../hooks/useToast'
import countries from '../../mock/mockCountries.json'
import languages from '../../mock/mockLanguages.json'

function DashboardSettingsPage() {
  const { settings, updateSetting, resetSettings } = useDashboardSettings()
  const { theme, setTheme } = useTheme()
  const { showToast } = useToast()

  const onSettingChange = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    updateSetting(key, value)
    showToast('Settings updated', 'success')
  }

  const onThemeChange = (mode) => {
    setTheme(mode)
    showToast('Settings updated', 'success')
  }

  const onReset = () => {
    resetSettings()
    setTheme(THEME_MODES.light)
    showToast('Settings reset to defaults', 'info')
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <p className="eyebrow">Settings</p>
        <h1>Tune your dashboard.</h1>
        <p>Preferences are stored locally in this browser.</p>
      </header>

      <div className="settings-grid">
        <section className="settings-card">
          <h2>Appearance</h2>
          <div className="field">
            <span className="field__label">Theme</span>
            <div className="theme-toggle" role="radiogroup" aria-label="Theme">
              <button type="button" role="radio" aria-checked={theme === THEME_MODES.light} className={theme === THEME_MODES.light ? 'is-active' : ''} onClick={() => onThemeChange(THEME_MODES.light)}>
                ☀ Light
              </button>
              <button type="button" role="radio" aria-checked={theme === THEME_MODES.dark} className={theme === THEME_MODES.dark ? 'is-active' : ''} onClick={() => onThemeChange(THEME_MODES.dark)}>
                ☾ Dark
              </button>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <h2>Search defaults</h2>
          <label className="field">
            <span className="field__label">Language</span>
            <select className="input" value={settings.language} onChange={onSettingChange('language')}>
              {languages.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
            </select>
          </label>
          <label className="field">
            <span className="field__label">Default country</span>
            <select className="input" value={settings.defaultCountry} onChange={onSettingChange('defaultCountry')}>
              {countries.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
            </select>
          </label>
          <label className="field">
            <span className="field__label">Default device</span>
            <select className="input" value={settings.defaultDevice} onChange={onSettingChange('defaultDevice')}>
              {DEVICE_OPTIONS.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="field">
            <span className="field__label">Results per page</span>
            <select className="input" value={settings.resultsPerPage} onChange={onSettingChange('resultsPerPage')}>
              {RESULT_COUNT_OPTIONS.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        </section>

        <section className="settings-card">
          <h2>Notifications &amp; history</h2>
          <label className="settings-toggle">
            <input type="checkbox" checked={settings.notificationsEnabled} onChange={onSettingChange('notificationsEnabled')} />
            <span>Enable notifications</span>
          </label>
          <label className="settings-toggle">
            <input type="checkbox" checked={settings.autoSaveHistory} onChange={onSettingChange('autoSaveHistory')} />
            <span>Automatically save search history</span>
          </label>
        </section>

        <section className="settings-card">
          <h2>Reset</h2>
          <p>Restore every dashboard preference, including theme, back to its default value.</p>
          <button type="button" className="button button--secondary" onClick={onReset}>Reset settings</button>
        </section>
      </div>
    </div>
  )
}

export default DashboardSettingsPage
