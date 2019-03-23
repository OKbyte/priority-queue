const Node = require("./node");

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority);

		this.insertNode(node);
		this.shiftNodeUp(node);

		this.heapSize++;
	}

	pop() {
		if (!this.isEmpty()) {
			const detached = this.detachRoot();

			this.restoreRootFromLastInsertedNode(detached);

			if (this.root) {
				this.shiftNodeDown(this.root);
			}

			this.heapSize--;

			return detached.data;
		}
	}

	detachRoot() {
		const current = this.root;

		if (!this.root.right) {
			this.parentNodes.shift();
		}

		this.root = null;

		return current;
	}

	restoreRootFromLastInsertedNode(detached) {
		const last = this.parentNodes.pop();

		if (
			last &&
			detached.data !== undefined &&
			detached.priority !== undefined
		) {
			const lastParent = last.parent;
			const rootLeft = detached.left;
			const rootRight = detached.right;

			if (rootLeft) rootLeft.remove();
			if (rootLeft && last !== rootLeft) last.appendChild(rootLeft);

			if (rootRight) rootRight.remove();
			if (rootRight && last !== rootRight) last.appendChild(rootRight);

			if (lastParent === detached) {
				this.parentNodes.unshift(last);
			} else if (lastParent.right === last) {
				this.parentNodes.unshift(lastParent);
			}

			if (last.parent) last.remove();

			this.root = last;
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		if (!this.size()) {
			return true;
		} else {
			return false;
		}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];

		this.heapSize = 0;
	}

	insertNode(node) {
		if (this.root) {
			const parentHolder = this.parentNodes[0];

			if (parentHolder.left) {
				parentHolder.appendChild(node);
				this.parentNodes.shift();
				this.parentNodes.push(node);
			} else {
				parentHolder.appendChild(node);
				this.parentNodes.push(node);
			}
		} else {
			this.root = node;
			this.parentNodes.push(node);
		}
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			if (!node.right && !node.parent.right) {
				let i = this.parentNodes.indexOf(node);
				let j = this.parentNodes.indexOf(node.parent);

				this.parentNodes[i] = node.parent;
				this.parentNodes[j] = node;
			} else if (!node.right) {
				let i = this.parentNodes.indexOf(node);

				this.parentNodes[i] = node.parent;
			}

			node.swapWithParent();
			this.shiftNodeUp(node);
		}

		if (!node.parent) {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		let nodeChild;

		if (node.left) {
			nodeChild = node.left;
		} else {
			nodeChild = null;
		}

		if (nodeChild && node.right && node.right.priority > nodeChild.priority) {
			nodeChild = node.right;
		}

		if (nodeChild && nodeChild.priority > node.priority) {
			if (!nodeChild.right && !node.right) {
				let i = this.parentNodes.indexOf(nodeChild);
				let j = this.parentNodes.indexOf(node);

				this.parentNodes[i] = node;
				this.parentNodes[j] = nodeChild;
			} else if (!nodeChild.right) {
				let i = this.parentNodes.indexOf(nodeChild);

				this.parentNodes[i] = node;
			}

			if (this.root === node) {
				this.root = nodeChild;
			}

			nodeChild.swapWithParent();
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
