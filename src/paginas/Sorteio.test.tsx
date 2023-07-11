import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import Sorteio from "./Sorteio";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";

jest.mock('../state/hook/useListaDeParticipantes', () => {
  return { //retorna um objeto com o hook, e solicitamos que o mock desse hook atue como uma função
    useListaDeParticipantes: jest.fn()
  }
})
jest.mock('../state/hook/useResultadoSorteio', () => {
  return { //retorna um objeto com o hook, e solicitamos que o mock desse hook atue como uma função
    useResultadoSorteio: jest.fn()
  }
})

describe('na pagina de sorteio', () => {
  const participantes = [ 'Ana', 'Catarina', 'Josefina']

  const resultado = new Map([['Ana', 'Josefina'], ['Catarina', 'Ana'], ['Josefina', 'Catarina']])

  beforeEach(() => { //antes de cada teste, ele vai usar o hook como uma simulação até o valor de retorno
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
    
  })

  test('todos os participantes podem exibir o seu amigo secreto', () => {
    //ARRANGE
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    )
    //ACT  
    const opcoes = screen.queryAllByRole('option')
    //ASSERT  
    expect(opcoes).toHaveLength(participantes.length + 1) //porque já vem uma option por padrão
  })

  test('o amigo secreto é exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    )

    const select = screen.getByPlaceholderText('Selecione o seu nome')

    fireEvent.change(select, {
      target: {
        value: participantes[0]
      }
    })

    const botao = screen.getByRole('button')

    fireEvent.click(botao)

    const amigoSecreto = screen.getByRole('alert')

    expect(amigoSecreto).toBeInTheDocument()
  })

  test('esconde o amigo secreto sorteado depois de 5 segundos', () => {
    jest.useFakeTimers();

    render(
        <RecoilRoot>
            <Sorteio />
        </RecoilRoot>
    )

    const select = screen.getByPlaceholderText('Selecione o seu nome')
    fireEvent.change(select, {
      target: { 
        value: participantes[1] 
      } 
    })

    const button = screen.getByRole('button')
    fireEvent.click(button)
    act(() => {
        jest.runAllTimers();
    })
    const alerta = screen.queryByRole('alert')
    expect(alerta).not.toBeInTheDocument()
  })
})