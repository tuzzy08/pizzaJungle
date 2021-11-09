import { app } from 'electron';
import serve from 'electron-serve';
import installExtension, {
	REDUX_DEVTOOLS,
	REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady().then(() => {
		installExtension(REDUX_DEVTOOLS)
			.then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
    installExtension(REACT_DEVELOPER_TOOLS)
			.then((name) => console.log(`Added Extension:  ${name}`))
			.catch((err) => console.log('An error occurred: ', err));
	});

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    frame: false,
    fullscreen: true,
    fullscreenable: true,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
