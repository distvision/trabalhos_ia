class TreeNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None
    
    def insert(self, key):
        self.root = self._insert_rec(self.root, key)
    
    def _insert_rec(self, node, key):
        if node is None:
            return TreeNode(key)
        
        if key < node.key:
            node.left = self._insert_rec(node.left, key)
        else:
            node.right = self._insert_rec(node.right, key)
        
        return node
    
    def search(self, key):
        return self._search_rec(self.root, key)
    
    def _search_rec(self, node, key):
        if node is None or node.key == key:
            return node
        
        if key < node.key:
            return self._search_rec(node.left, key)
        else:
            return self._search_rec(node.right, key)
    
    def delete(self, key):
        self.root = self._delete_rec(self.root, key)
    
    def _delete_rec(self, node, key):
        if node is None:
            return node
        
        if key < node.key:
            node.left = self._delete_rec(node.left, key)
        elif key > node.key:
            node.right = self._delete_rec(node.right, key)
        else:
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left
            
            temp = self._find_min(node.right)
            node.key = temp.key
            node.right = self._delete_rec(node.right, temp.key)
        
        return node
    
    def _find_min(self, node):
        while node.left is not None:
            node = node.left
        return node
    
    def inorder_traversal(self):
        result = []
        self._inorder_rec(self.root, result)
        return result
    
    def _inorder_rec(self, node, result):
        if node is not None:
            self._inorder_rec(node.left, result)
            result.append(node.key)
            self._inorder_rec(node.right, result)

# Exemplo de uso
tree = BinaryTree()
tree.insert(5)
tree.insert(3)
tree.insert(7)
tree.insert(2)
tree.insert(4)

print("Árvore ordenada:")
print(tree.inorder_traversal())

print("Procurando valor 3:", tree.search(3).key)
print("Procurando valor 6:", tree.search(6))

tree.delete(3)
print("Árvore após a exclusão do valor 3:")
print(tree.inorder_traversal())
