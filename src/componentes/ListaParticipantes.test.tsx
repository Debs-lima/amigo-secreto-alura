import React from "react"
import { RecoilRoot } from "recoil"
import { render, screen } from '@testing-library/react'
import ListaParticipantes from "./ListaParticipantes"
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"
//método de simular uma situação/estado: declarando o que o jest precisa simular
jest.mock('../state/hook/useListaDeParticipantes', () => {
  return { //retorna um objeto com o hook, e solicitamos que o mock desse hook atue como uma função
    useListaDeParticipantes: jest.fn()
  }
})

describe('uma lista vazia de participantes', () => {
  beforeEach(() => { //antes de cada teste, ele vai usar o hook como uma simulação até o valor de retorno
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })

  test('deve ser renderizada sem elementos', () => {
    //ARRANGE
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    )
    //ACT
    const itens = screen.queryAllByRole('listitem')
    //ASSERT
    expect(itens).toHaveLength(0)
  })
})

describe('uma lista preenchida de participantes', () => {
  const participantes = ['Ana', 'Catarina']
  beforeEach(() => { //antes de cada teste, ele vai usar o hook como uma simulação até o valor de retorno
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  test('deve ser renderizada com elementos', () => {
    //ARRANGE
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    )
    //ACT
    const itens = screen.queryAllByRole('listitem')
    //ASSERT
    expect(itens).toHaveLength(participantes.length)
  })
})