class TreeNode {
  key: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(key: number) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  insert(key: number): void {
    this.root = this._insertRec(this.root, key);
  }

  _insertRec(node: TreeNode | null, key: number): TreeNode {
    if (node === null) {
      return new TreeNode(key);
    }

    if (key < node.key) {
      node.left = this._insertRec(node.left, key);
    } else {
      node.right = this._insertRec(node.right, key);
    }

    return node;
  }

  search(key: number): TreeNode | null {
    return this._searchRec(this.root, key);
  }

  _searchRec(node: TreeNode | null, key: number): TreeNode | null {
    if (node === null || node.key === key) {
      return node;
    }

    if (key < node.key) {
      return this._searchRec(node.left, key);
    } else {
      return this._searchRec(node.right, key);
    }
  }

  delete(key: number): void {
    this.root = this._deleteRec(this.root, key);
  }

  _deleteRec(node: TreeNode | null, key: number): TreeNode | null {
    if (node === null) {
      return node;
    }

    if (key < node.key) {
      node.left = this._deleteRec(node.left, key);
    } else if (key > node.key) {
      node.right = this._deleteRec(node.right, key);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      const temp = this._findMin(node.right);
      node.key = temp.key;
      node.right = this._deleteRec(node.right, temp.key);
    }

    return node;
  }

  _findMin(node: TreeNode): TreeNode {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  inorderTraversal(): number[] {
    const result: number[] = [];
    this._inorderRec(this.root, result);
    return result;
  }

  _inorderRec(node: TreeNode | null, result: number[]): void {
    if (node !== null) {
      this._inorderRec(node.left, result);
      result.push(node.key);
      this._inorderRec(node.right, result);
    }
  }

  breadthFirstSearch(): number[] {
    const result: number[] = [];
    if (this.root === null) {
      return result;
    }

    const queue: TreeNode[] = [];
    queue.push(this.root);

    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.key);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return result;
  }

  depthFirstSearchPreorder(): number[] {
    return this._dfsPreorderRec(this.root);
  }

  _dfsPreorderRec(node: TreeNode | null): number[] {
    const result: number[] = [];
    if (node !== null) {
      result.push(node.key);
      result.push(...this._dfsPreorderRec(node.left));
      result.push(...this._dfsPreorderRec(node.right));
    }
    return result;
  }

  depthFirstSearchInorder(): number[] {
    return this._dfsInorderRec(this.root);
  }

  _dfsInorderRec(node: TreeNode | null): number[] {
    const result: number[] = [];
    if (node !== null) {
      result.push(...this._dfsInorderRec(node.left));
      result.push(node.key);
      result.push(...this._dfsInorderRec(node.right));
    }
    return result;
  }

  depthFirstSearchPostorder(): number[] {
    return this._dfsPostorderRec(this.root);
  }

  _dfsPostorderRec(node: TreeNode | null): number[] {
    const result: number[] = [];
    if (node !== null) {
      result.push(...this._dfsPostorderRec(node.left));
      result.push(...this._dfsPostorderRec(node.right));
      result.push(node.key);
    }
    return result;
  }
}

// Exemplo de uso
const tree = new BinaryTree();
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(6);
tree.insert(2);
tree.insert(8);
tree.insert(4);

console.log("Árvore ordenada:");
console.log(tree.inorderTraversal());

const searchResult1 = tree.search(7);
console.log("Procurando valor:", searchResult1 ? searchResult1.key : "Valor não encontrado");

const searchResult2 = tree.search(6);
console.log("Procurando valor:", searchResult2 ? searchResult2.key : "Valor não encontrado");

tree.delete(3);
console.log("Árvore após a exclusão do valor 3:");
console.log(tree.inorderTraversal());

// Exemplo de uso busca em largura e em profundidade
const tree2 = new BinaryTree();
tree2.insert(5);
tree2.insert(3);
tree2.insert(7);
tree2.insert(2);
tree2.insert(4);
tree2.insert(9);

console.log("Busca em largura (BFS):", tree2.breadthFirstSearch());
console.log("Busca em profundidade (Pré-ordem):", tree2.depthFirstSearchPreorder());
console.log("Busca em profundidade (Inordem):", tree2.depthFirstSearchInorder());
console.log("Busca em profundidade (Pós-ordem):", tree2.depthFirstSearchPostorder());
