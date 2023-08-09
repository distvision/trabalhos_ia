from collections import deque

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


    def breadth_first_search(self):
        result = []
        if self.root is None:
            return result
        
        queue = deque()
        queue.append(self.root)
        
        while queue:
            node = queue.popleft()
            result.append(node.key)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        return result
    
    def depth_first_search_preorder(self):
        return self._dfs_preorder_rec(self.root)
    
    def _dfs_preorder_rec(self, node):
        result = []
        if node:
            result.append(node.key)
            result.extend(self._dfs_preorder_rec(node.left))
            result.extend(self._dfs_preorder_rec(node.right))
        return result
    
    def depth_first_search_inorder(self):
        return self._dfs_inorder_rec(self.root)
    
    def _dfs_inorder_rec(self, node):
        result = []
        if node:
            result.extend(self._dfs_inorder_rec(node.left))
            result.append(node.key)
            result.extend(self._dfs_inorder_rec(node.right))
        return result
    
    def depth_first_search_postorder(self):
        return self._dfs_postorder_rec(self.root)
    
    def _dfs_postorder_rec(self, node):
        result = []
        if node:
            result.extend(self._dfs_postorder_rec(node.left))
            result.extend(self._dfs_postorder_rec(node.right))
            result.append(node.key)
        return result


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

# Exemplo de uso busca eme largura e em profundidade
tree = BinaryTree()
tree.insert(5)
tree.insert(3)
tree.insert(7)
tree.insert(2)
tree.insert(4)

print("Busca em largura (BFS):", tree.breadth_first_search())
print("Busca em profundidade (Pré-ordem):", tree.depth_first_search_preorder())
print("Busca em profundidade (Inordem):", tree.depth_first_search_inorder())
print("Busca em profundidade (Pós-ordem):", tree.depth_first_search_postorder())
