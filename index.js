// Assets
import './src/assets/app.css';

// Components
export * from './src/components/ui';

// Layouts
export * from './src/layouts/index.js';

// Stores
export { useThemeStore } from './src/stores/theme.js';

export default function instax() {
	return "Instax Package Initialized";
}