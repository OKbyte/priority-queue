class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.right && this.left) {
			this.right = node;
			node.parent = this;
		}

		if (!this.left) {
			this.left = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
		} else if (this.right === node) {
			this.right = null;
			node.parent = null;
		} else {
			throw "Warning! Passed node is not a child of this node!";
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {
			const c = this;
			const b = this.parent;
			const a = b.parent;

			const cStack = [];
			const cRight = c.right;
			const cLeft = c.left;

			const bStack = [];
			const bRight = b.right;
			const bLeft = b.left;

			if (cRight) {
				cRight.remove();
				cStack.push(cRight);
			}

			if (cLeft) {
				cLeft.remove();
				cStack.push(cLeft);
			}

			if (bRight && bRight !== c) {
				bRight.remove();
				bStack.push(bRight);
			} else if (bRight && bRight === c) {
				bRight.remove();
				bStack.push(b);
			}

			if (bLeft && bLeft !== c) {
				bLeft.remove();
				bStack.push(bLeft);
			} else if (bLeft && bLeft === c) {
				bLeft.remove();
				bStack.push(b);
			}

			if (a) {
				b.remove();
				a.appendChild(c);
			}

			while (bStack.length !== 0) {
				c.appendChild(bStack.pop());
			}

			while (cStack.length !== 0) {
				b.appendChild(cStack.pop());
			}
		}
	}
}

module.exports = Node;
