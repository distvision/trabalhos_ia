class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  // Create (Insert) operation
  insert(value: number): void {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
    } else {
      this._insertRecursively(this.root, newNode);
    }
  }

  private _insertRecursively(node: TreeNode, newNode: TreeNode): void {
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this._insertRecursively(node.left, newNode);
      }
    } else if (newNode.value > node.value) {
      if (!node.right) {
        node.right = newNode;
      } else {
        this._insertRecursively(node.right, newNode);
      }
    }
  }

  // Read (Search) operation
  search(value: number): TreeNode | null {
    return this._searchRecursively(this.root, value);
  }

  private _searchRecursively(node: TreeNode | null, value: number): TreeNode | null {
    if (!node) {
      return null;
    }

    if (node.value === value) {
      return node;
    } else if (value < node.value) {
      return this._searchRecursively(node.left, value);
    } else {
      return this._searchRecursively(node.right, value);
    }
  }

  // Update operation (Not typically performed directly on binary trees)

  // Delete operation
  delete(value: number): void {
    if (!this.root) {
      return;
    }

    this.root = this._deleteRecursively(this.root, value);
  }

  private _deleteRecursively(node: TreeNode | null, value: number): TreeNode | null {
    if (!node) {
      return null;
    }

    if (value < node.value) {
      node.left = this._deleteRecursively(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteRecursively(node.right, value);
    } else {
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }

      const minValue = this._findMinValue(node.right);
      node.value = minValue;
      node.right = this._deleteRecursively(node.right, minValue);
    }

    return node;
  }

  private _findMinValue(node: TreeNode): number {
    while (node.left) {
      node = node.left;
    }
    return node.value;
  }
}

// Usage
const binaryTree = new BinaryTree();
binaryTree.insert(5);
binaryTree.insert(3);
binaryTree.insert(7);
binaryTree.insert(2);
binaryTree.insert(4);
binaryTree.insert(6);
binaryTree.insert(8);

console.log(binaryTree.search(6)); // Outputs the node with value 6

binaryTree.delete(7);
console.log(binaryTree.search(7)); // Outputs null (node with value 7 is deleted)
