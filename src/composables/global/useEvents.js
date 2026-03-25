import { onMounted, onUnmounted } from 'vue';

const useEvents = () => {
	function listen(name, callback, element = window) {
		if (!element) {
			return;
		}
		
		onMounted(() => {
			element.addEventListener(name, callback);
		});

		onUnmounted(() => {
			element.removeEventListener(name, callback);
		});
	}
	
	return { listen };
}

export default useEvents;