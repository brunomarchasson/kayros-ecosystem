import db from '..'

export const insert = async (data, { transaction } = {}) => {
  console.log(data)
  return Promise.all(
    Object.entries(data).map(([tableName, cols]) => {
      const req = db.request(transaction)
      Object.entries(cols).forEach(([colName, value]) => {
        req.input(colName, value)
      })
      const q = `INSERT INTO ${tableName} (${Object.keys(cols).join(', ')}) VALUES(${Object.keys(cols).map(name => `@${name}`).join(', ')})`
      console.log('q=>', q)
      return req.query(q)
    })
  )
}

export const upsert = async (obj, { transaction }) => {
  console.log('upsert', obj)

  return Promise.all(
    Object.entries(obj).map(([tableName, { key, data }]) => {
      const req = db.request(transaction)
      Object.entries(data).forEach(([colName, value]) => {
        req.input(colName, value)
      })
      Object.entries(key).forEach(([colName, value]) => {
        req.input(colName, value)
      })
      const q = `
      BEGIN TRAN
        UPDATE ${tableName} WITH (UPDLOCK, SERIALIZABLE)
         SET ${Object.keys(data).map(name => `${name} = @${name}`).join(', ')}
       WHERE ${Object.keys(key).map(name => `${name} = @${name}`).join(' AND ')}

      IF (@@ROWCOUNT = 0)
      BEGIN
        INSERT INTO ${tableName} (${Object.keys(data).join(', ')}) VALUES(${Object.keys(data).map(name => `@${name}`).join(', ')})
      END
      COMMIT
      `;
      console.log('q =>', q)
      return req.query(q)

    })
  )
}
