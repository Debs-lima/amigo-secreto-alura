import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Formulario from './Formulario';
import { RecoilRoot } from 'recoil';

describe('o comportamento do Formulario.tsx', () => {
  //Lib Jest e testing lib estão agindo nessa lógica de teste
//arg 1 - o que será testado, arg 2 - implementação do teste em si
test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
  //ARRUMAMOS O CENÁRIO: comando para o jest: primeiro, devemos renderizar o componente, o documento que será trabalhado
  render(
    <RecoilRoot>
      <Formulario />
    </RecoilRoot>
  )
  //AGIMOS
  //encontrar no dom o input
  const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

  //encontrar o botao
  const botao = screen.getByRole('button')
  //AFIRMAMOS O QUE QUEREMOS
  //garantir que o input esteja no documento
  expect(input).toBeInTheDocument()

  //garantir que o botão esteja desabilitado
  expect(botao).toBeDisabled()
})

test('adicionar um participante caso exista um nome preenchido', () => {
  render(
    <RecoilRoot>
      <Formulario />
    </RecoilRoot>
  )
  const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
  const botao = screen.getByRole('button')

  //inserir um valor no input
  fireEvent.change(input, {
    target: {
      value: 'Ana Catarina'
    }
  })
  //clicar no botão de submeter
  fireEvent.click(botao)
  //garantir que o input esteja com o foco ativo
  expect(input).toHaveFocus()
  //garantir que o input não tenha um valor
  expect(input).toHaveValue('')
})

test('nomes duplicados não podem ser adicionados na lista', () => {
  //ARRUMAMOS O CENÁRIO
  render(
    <RecoilRoot>
      <Formulario />
    </RecoilRoot>
  )
  //AGIMOS
  const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
  const botao = screen.getByRole('button')

  fireEvent.change(input, {
    target: {
      value: 'Ana Catarina'
    }
  })
  fireEvent.click(botao)

  fireEvent.change(input, {
    target: {
      value: 'Ana Catarina'
    }
  })
  fireEvent.click(botao)
  //AFIRMAMOS O QUE QUEREMOS
  const mensagemDeErro = screen.getByRole('alert')
  expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
})

test('a mensagem de erro deve sumir após os timers', () => {
  jest.useFakeTimers()
  //ARRUMAMOS O CENÁRIO
  render(
    <RecoilRoot>
      <Formulario />
    </RecoilRoot>
  )
  //AGIMOS
  const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
  const botao = screen.getByRole('button')

  fireEvent.change(input, {
    target: {
      value: 'Ana Catarina'
    }
  })
  fireEvent.click(botao)

  fireEvent.change(input, {
    target: {
      value: 'Ana Catarina'
    }
  })
  fireEvent.click(botao)
  //AFIRMAMOS O QUE QUEREMOS
  let mensagemDeErro = screen.queryByRole('alert')
  expect(mensagemDeErro).toBeInTheDocument()
  //esperar n segundos
  act(() => {   // fire events that update state
    jest.runAllTimers()
  });

  
  mensagemDeErro = screen.queryByRole('alert') //com o query, pode existir ou não
  expect(mensagemDeErro).toBeNull()
})
})

