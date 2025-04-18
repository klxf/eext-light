/**
 * 入口文件
 *
 * 本文件为默认扩展入口文件，如果你想要配置其它文件作为入口文件，
 * 请修改 `extension.json` 中的 `entry` 字段；
 *
 * 请在此处使用 `export`  导出所有你希望在 `headerMenus` 中引用的方法，
 * 方法通过方法名与 `headerMenus` 关联。
 *
 * 如需了解更多开发细节，请阅读：
 * https://prodocs.lceda.cn/cn/api/guide/
 */
import * as extensionConfig from '../extension.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function activate(status?: 'onStartupFinished', arg?: string): void {}

export function about(): void {
	eda.sys_MessageBox.showInformationMessage(extensionConfig.name + ' ' + extensionConfig.version + '\n' + extensionConfig.description, '关于');
}

export function openIframe(): void {
	if (!eda.sys_Environment.isJLCEDAProEdition()) {
		eda.sys_ToastMessage.showMessage('本拓展仅支持嘉立创 EDA 专业版', ESYS_ToastMessageType.WARNING);
		return;
	}
	eda.sys_IFrame.openIFrame('/iframe/index.html', 500, 300);
}
