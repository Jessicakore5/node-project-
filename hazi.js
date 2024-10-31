import express from 'express'

const app = express()

const port = 3000

app.get('/Sziasztok', (reg, res) => {
  res.send('Sziasztok hogy megy a napotok?')
})

app.post('/Limpopoi', (reg, res) => {
  res.send(
    'Limpopoi Pimpógyökeret szopó Puhapopójú Pónilópopót-lopó Pótpápua Puapó'
  )
})

app.put('/a', (reg, res) => {
  res.send('A paradicsomot beparadicsomosítlanítottátok')
})

app.patch('/Hatarozathozataltalansagaitoktol', (reg, res) => {
  res.send(
    'Határozathozataltalanságaitoktól elbizonytalankodhatnékom támadhatna esetleg.'
  )
})

app.delete('/Hello', (reg, res) => {
  res.send('Hello ez itt a hazim')
})

app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port}cimen`)
})
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{mjs,cjs,js}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules
    }
  }
]
