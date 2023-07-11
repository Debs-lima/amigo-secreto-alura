import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Rodape from "./Rodape";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";

jest.mock('../state/hook/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

//simulando ações do react-router-dom: se o botao tiver habilitado, navegar para a página do sorteio
const mockNavegacao = jest.fn() //em uma variavel já que precisaremos voltar nela depois
const mockSorteio = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao
  }
})

jest.mock('../state/hook/useSorteador', () => {
  return {
    useSorteador: () => mockSorteio
  }
})

describe('onde não existem participantes o suficiente', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })
  test('a brincadeira não pode ser iniciada', () => {
    //ARRANGE
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )
    //ACT  
    const botao = screen.getByRole('button')
    //ASSERT
    expect(botao).toBeDisabled()

  })
})

describe('quando existem participantes o suficiente', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'Josefina'])
  })
  test('a brincadeira pode ser iniciada', () => {
    //ARRANGE
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )
    //ACT  
    const botao = screen.getByRole('button')
    //ASSERT
    expect(botao).not.toBeDisabled()
  })

  test('a brincadeira foi iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )

    const botao = screen.getByRole('button')
    fireEvent.click(botao)

    expect(mockNavegacao).toHaveBeenCalledTimes(1)
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
    expect(mockSorteio).toHaveBeenCalledTimes(1)  
  })
})