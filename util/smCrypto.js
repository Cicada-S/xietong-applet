import smCrypto from 'sm-crypto'

const cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1
const publicKey =
	'04298364ec840088475eae92a591e01284d1abefcda348b47eb324bb521bb03b0b2a5bc393f6b71dabb8f15c99a0050818b56b23f31743b93df9cf8948f15ddb54'

/**
 * 国密加解密工具类
 */
const smCryptoUtil = {
	/**
	 * SM2加密
	 * @param {Object} msgString
	 */
	doSm2Encrypt(msgString) {
		return smCrypto.sm2.doEncrypt(msgString, publicKey, cipherMode)
	}
}


export default smCryptoUtil