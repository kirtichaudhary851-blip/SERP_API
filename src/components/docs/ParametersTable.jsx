function ParametersTable({ parameters }) {
  return (
    <div className="parameters-table-wrapper">
      <table className="parameters-table">
        <caption className="sr-only">Request parameters</caption>
        <thead>
          <tr>
            <th scope="col">Parameter</th>
            <th scope="col">Type</th>
            <th scope="col">Required</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param) => (
            <tr key={param.name}>
              <th scope="row"><code>{param.name}</code></th>
              <td>{param.type}</td>
              <td>{param.required ? <span className="param-required">Required</span> : 'Optional'}</td>
              <td><code>{param.default}</code></td>
              <td>{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ParametersTable
