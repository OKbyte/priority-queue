const MaxHeap = require("./max-heap.js");

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.size() < this.maxSize) {
			this.heap.push(data, priority);
		} else {
			throw "Warning! Queue has max size!";
		}
	}

	shift() {
		if (this.heap.size()) {
			const removed = this.heap.pop();

			return removed;
		} else {
			throw "Warning! Queue is empty!";
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		if (!this.size()) {
			return true;
		} else {
			return false;
		}
	}
}

module.exports = PriorityQueue;
