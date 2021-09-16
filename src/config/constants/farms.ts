import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'
import * as Addresses from './addresses'
import starLAbi from '../abi/starLAbi.json'
import sandAbi from '../abi/sandAbi.json'
import axsABi from '../abi/axsAbi.json'
import ethABI from '../abi/ethAbi.json'
import cheffManaAbi from '../abi/cheffMana.json'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'MANA',
    lpAddresses: '0xAed25aFc61B70CC6b1eF2bd9E23834DDCF8562ad',
    cheffAddress: Addresses.masterChefMana,
    tokenSymbol: 'MANA',
    tokenAddresses: {
      97: '',
      56: '0x896eDE222D3f7f3414e136a2791BDB08AAa25Ce0',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 3,
    lpSymbol: 'STARTLINK',
    lpAddresses: '0xf47dDA17b2E31e4D98c62210Cb5b5807c16e224d',
    cheffAddress: Addresses.starLink,
    tokenSymbol: 'STARTLINK',
    tokenAddresses: {
      97: '',
      56: '0x5ac52ee5b2a633895292ff6d8a89bb9190451587',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'ETH',
    lpAddresses: '',
    cheffAddress: Addresses.cheffEth,
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x5ac52ee5b2a633895292ff6d8a89bb9190451587',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    risk: 3,
    lpSymbol: 'SAND',
    lpAddresses: '0xE7b623D32b34b427c6c48bF65C480d5086574e10',
    cheffAddress: Addresses.sand,
    tokenSymbol: 'SAND',
    tokenAddresses: {
      97: '',
      56: '0x5ac52ee5b2a633895292ff6d8a89bb9190451587',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 4,
    risk: 3,
    lpSymbol: 'AXS',
    lpAddresses: '0xe9945F45Faa2751a3a004509518Db0D901148A60',
    cheffAddress: Addresses.axs,
    tokenSymbol: 'AXS',
    tokenAddresses: {
      97: '',
      56: '0x5ac52ee5b2a633895292ff6d8a89bb9190451587',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms
