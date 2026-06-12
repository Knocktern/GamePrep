-- ============================================================
--  GamePrep - Seed Script v2 PART 3
--  DSA: Queue, Tree, Graph
--  Coverage: 3 topics x 3 difficulties x (20 MCQ + 5 CODING) = 225 rows
--  Coding language: C++
-- ============================================================

USE gameprep_db;

DELETE FROM questions
WHERE prep_field = 'DSA'
  AND topic IN ('Queue', 'Tree', 'Graph');

-- 20 MCQ per topic/difficulty: 5 concepts x 4 question variants.
INSERT INTO questions (title, description, type, difficulty, prep_field, topic, options_json, correct_answer)
SELECT
    CONCAT(c.concept, ' ', v.title_suffix) AS title,
    CASE v.kind
        WHEN 'MEANING' THEN CONCAT('In ', c.topic, ' (', c.difficulty, '), which statement best describes ', c.concept, '?')
        WHEN 'USE_CASE' THEN CONCAT('When should you use ', c.concept, ' while solving ', c.topic, ' problems?')
        WHEN 'PITFALL' THEN CONCAT('Which mistake is most closely related to ', c.concept, '?')
        ELSE CONCAT('Which example correctly demonstrates ', c.concept, '?')
    END AS description,
    'MCQ' AS type,
    c.difficulty,
    'DSA' AS prep_field,
    c.topic,
    CASE v.kind
        WHEN 'MEANING' THEN JSON_ARRAY(c.meaning, 'It is only a naming convention with no effect on logic', 'It is used only after sorting the final answer', 'It always reduces the complexity to O(1)')
        WHEN 'USE_CASE' THEN JSON_ARRAY(c.use_case, 'Use it when the input constraints are irrelevant', 'Use it only after brute force has already timed out', 'Use it to avoid defining input and output clearly')
        WHEN 'PITFALL' THEN JSON_ARRAY(c.pitfall, 'Assuming every DSA problem has a unique solution', 'Ignoring variable names while writing code', 'Using comments instead of validating logic')
        ELSE JSON_ARRAY(c.example, 'A variable name chosen only for readability', 'A comment that says the algorithm is correct', 'A loop that never reads the input data')
    END AS options_json,
    CASE v.kind
        WHEN 'MEANING' THEN c.meaning
        WHEN 'USE_CASE' THEN c.use_case
        WHEN 'PITFALL' THEN c.pitfall
        ELSE c.example
    END AS correct_answer
FROM (
    SELECT 'Queue' topic, 'EASY' difficulty, 'FIFO order' concept,
           'First In, First Out: the earliest inserted element is removed first' meaning,
           'Use it when work must be processed in arrival order' use_case,
           'Removing from the rear instead of the front breaks FIFO behavior' pitfall,
           'push at rear and pop from front' example
    UNION ALL SELECT 'Queue','EASY','front and rear pointers','front tracks the next element to remove and rear tracks where to insert','Use them to implement enqueue and dequeue efficiently','Forgetting to update front or rear after removal or insertion','front = (front + 1) % capacity'
    UNION ALL SELECT 'Queue','EASY','standard queue operations','push/enqueue inserts, pop/dequeue removes, front reads the next item','Use them for basic FIFO processing','Calling front on an empty queue causes invalid access','q.push(x); q.pop(); q.front();'
    UNION ALL SELECT 'Queue','EASY','BFS traversal','Breadth First Search explores nodes level by level using a queue','Use it to find shortest paths in unweighted graphs','Marking nodes visited too late can enqueue duplicates','queue<int> q; q.push(src);'
    UNION ALL SELECT 'Queue','EASY','simple queue complexity','Queue insertion and deletion are O(1) with a proper implementation','Use it when frequent end insertion and front removal are needed','Using vector erase(begin) makes each pop O(n)','std::queue<int> q; q.push(10); q.pop();'

    UNION ALL SELECT 'Queue','MEDIUM','circular queue','A fixed-size queue where indices wrap around with modulo arithmetic','Use it to reuse freed array slots without shifting elements','Treating front == rear as both full and empty without a size rule','rear = (rear + 1) % capacity'
    UNION ALL SELECT 'Queue','MEDIUM','priority queue','A heap-backed structure that removes the highest priority item first','Use it for scheduling, top-K, and shortest path algorithms','Expecting FIFO order from a priority queue','priority_queue<int> pq; pq.push(5);'
    UNION ALL SELECT 'Queue','MEDIUM','deque','A double-ended queue supporting insertion and deletion at both ends','Use it for sliding window and 0-1 BFS patterns','Using a normal queue when you need push_front or pop_back','deque<int> dq; dq.push_front(x);'
    UNION ALL SELECT 'Queue','MEDIUM','sliding window maximum','A monotonic deque keeps candidate maximum indices for each window','Use it to compute all window maximums in O(n)','Keeping smaller elements behind a larger new element bloats the deque','while(!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();'
    UNION ALL SELECT 'Queue','MEDIUM','queue using two stacks','Two stacks can simulate FIFO by reversing insertion order during transfer','Use it when queue operations must be built from stack primitives','Moving elements on every operation instead of only when output stack is empty','if(out.empty()) while(!in.empty()) out.push(in.top()), in.pop();'

    UNION ALL SELECT 'Queue','HARD','0-1 BFS','A deque-based shortest path algorithm for edges with weights 0 or 1','Use it instead of Dijkstra when all weights are 0 or 1','Pushing weight-0 edges to the back loses optimal ordering','w == 0 ? dq.push_front(v) : dq.push_back(v)'
    UNION ALL SELECT 'Queue','HARD','multi-source BFS','BFS initialized with many starting nodes at distance zero','Use it for nearest-source grid or graph distance problems','Starting from only one source gives wrong distances','for(auto s: sources){ dist[s]=0; q.push(s); }'
    UNION ALL SELECT 'Queue','HARD','topological sort Kahn','Kahn algorithm uses a queue of zero in-degree vertices','Use it to produce ordering in a directed acyclic graph','Forgetting to detect remaining edges means cycles go unnoticed','if(--indeg[v] == 0) q.push(v);'
    UNION ALL SELECT 'Queue','HARD','monotonic deque invariant','Deque elements are kept ordered so obsolete candidates are removed early','Use it for O(n) range min/max window problems','Failing to remove out-of-window indices returns stale answers','if(dq.front() <= i-k) dq.pop_front();'
    UNION ALL SELECT 'Queue','HARD','bounded blocking queue idea','A queue with capacity where producers wait when full and consumers wait when empty','Use it for producer-consumer coordination','Ignoring synchronization causes races in shared queues','wait until !full before enqueue and !empty before dequeue'

    UNION ALL SELECT 'Tree','EASY','root node','The root is the topmost node of a tree and has no parent','Use it as the starting point for traversals','Assuming every node has a parent incorrectly includes the root','Node* root = new Node(10);'
    UNION ALL SELECT 'Tree','EASY','leaf node','A leaf is a node with no children','Use it as a base case in recursive tree logic','Treating null as a leaf node confuses traversal counts','if(!node->left && !node->right) leaf++;'
    UNION ALL SELECT 'Tree','EASY','binary tree','A tree where each node has at most two children','Use it for hierarchical structures with left and right links','Assuming a binary tree is always sorted','struct Node { int val; Node *left,*right; };'
    UNION ALL SELECT 'Tree','EASY','tree traversal','Traversal visits all nodes in a defined order such as inorder, preorder, or postorder','Use it to inspect or process every node','Mixing traversal order changes the output sequence','inorder(root->left); visit(root); inorder(root->right);'
    UNION ALL SELECT 'Tree','EASY','BST property','In a Binary Search Tree, left values are smaller and right values are larger','Use it for efficient ordered search when balanced','Ignoring balance can degrade operations to O(n)','if(x < root->val) root = root->left;'

    UNION ALL SELECT 'Tree','MEDIUM','level order traversal','A breadth-first traversal that visits nodes level by level using a queue','Use it to print or process a tree by depth','Forgetting to enqueue non-null children skips subtrees','queue<Node*> q; q.push(root);'
    UNION ALL SELECT 'Tree','MEDIUM','height of tree','Height is the longest path length from a node down to a leaf','Use it in balance checks and depth calculations','Returning the wrong base height for null shifts all answers','return 1 + max(height(l), height(r));'
    UNION ALL SELECT 'Tree','MEDIUM','AVL rotation','Rotations restore AVL balance after insertion or deletion','Use it when a BST must keep O(log n) operations','Applying the wrong LL/RR/LR/RL rotation keeps the tree unbalanced','rightRotate(root);'
    UNION ALL SELECT 'Tree','MEDIUM','heap property','In a heap, parent priority is ordered relative to child priority','Use it to implement priority queues efficiently','Assuming heap array order is fully sorted','parent index is (i - 1) / 2'
    UNION ALL SELECT 'Tree','MEDIUM','segment tree','A binary tree structure for range queries and point/range updates','Use it for repeated range sum/min/max queries','Building only leaves without merging parent values breaks queries','tree[node] = tree[left] + tree[right]'

    UNION ALL SELECT 'Tree','HARD','lowest common ancestor','The deepest node that is an ancestor of two target nodes','Use it for path queries and relationship queries in trees','Not handling the case where one target is ancestor of the other','if(root==p || root==q) return root;'
    UNION ALL SELECT 'Tree','HARD','binary lifting','Precomputes 2^k ancestors to answer ancestor and LCA queries quickly','Use it when many LCA queries must run in O(log n)','Skipping depth normalization before lifting gives wrong LCAs','up[v][k] = up[up[v][k-1]][k-1]'
    UNION ALL SELECT 'Tree','HARD','Fenwick tree','A compact structure for prefix sums with O(log n) update and query','Use it when prefix/range sum operations are frequent','Using zero-based index directly in classic BIT loops causes infinite loops','for(; i<=n; i+=i&-i) bit[i]+=delta;'
    UNION ALL SELECT 'Tree','HARD','Morris traversal','Inorder traversal using temporary threaded links and O(1) extra space','Use it when recursion and stack memory must be avoided','Forgetting to restore temporary links corrupts the tree','pred->right = cur; cur = cur->left;'
    UNION ALL SELECT 'Tree','HARD','red-black tree','A self-balancing BST using colors and rotations to bound height','Use it for ordered maps and sets with O(log n) operations','Breaking color invariants can destroy balance guarantees','std::map is commonly implemented as a red-black tree'

    UNION ALL SELECT 'Graph','EASY','vertices and edges','A graph is a set of vertices connected by edges','Use it to model networks, dependencies, and relationships','Confusing an edge with a vertex breaks representation','G = (V, E)'
    UNION ALL SELECT 'Graph','EASY','adjacency list','A graph representation storing neighbors for each vertex','Use it for sparse graphs to save memory','Forgetting to add both directions in undirected graphs','adj[u].push_back(v);'
    UNION ALL SELECT 'Graph','EASY','BFS graph traversal','BFS explores graph nodes by increasing distance from the source','Use it for shortest paths in unweighted graphs','Not marking visited nodes can cause repeated processing','queue<int> q; q.push(src);'
    UNION ALL SELECT 'Graph','EASY','DFS graph traversal','DFS explores as far as possible before backtracking','Use it for components, cycles, and traversal ordering','Recursive DFS can overflow stack on very deep graphs','dfs(v);'
    UNION ALL SELECT 'Graph','EASY','visited array','A visited array records which vertices have already been processed','Use it to avoid infinite loops in cyclic graphs','Marking visited after all recursion can revisit nodes many times','visited[u] = true;'

    UNION ALL SELECT 'Graph','MEDIUM','Dijkstra algorithm','Finds shortest paths from one source in graphs with non-negative weights','Use it for weighted graphs where all edge weights are >= 0','Using it with negative edge weights can produce wrong answers','priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;'
    UNION ALL SELECT 'Graph','MEDIUM','topological sort','Orders vertices so every directed edge goes from earlier to later','Use it for dependency ordering in DAGs','Trying to topologically sort a cyclic graph is invalid','Kahn algorithm starts with zero in-degree nodes'
    UNION ALL SELECT 'Graph','MEDIUM','directed cycle detection','Detects cycles using DFS recursion stack or node colors','Use it to validate DAG assumptions','Using only visited without recursion-stack misses back edges','color[u] = 1 while visiting, color[u] = 2 when done'
    UNION ALL SELECT 'Graph','MEDIUM','Union-Find','Maintains disjoint sets with near-constant union and find operations','Use it for connectivity and Kruskal MST','Not compressing paths can make repeated finds slower','parent[x] = find(parent[x]);'
    UNION ALL SELECT 'Graph','MEDIUM','bipartite graph check','Tests whether vertices can be colored using two colors without same-color edges','Use it for partition and matching prechecks','Failing to check disconnected components misses conflicts','color[v] = color[u] ^ 1;'

    UNION ALL SELECT 'Graph','HARD','Bellman-Ford','Computes shortest paths with negative edges and detects negative cycles','Use it when graph weights may be negative','Stopping before V-1 relaxations can miss valid shortest paths','relax every edge V-1 times'
    UNION ALL SELECT 'Graph','HARD','Floyd-Warshall','All-pairs shortest path dynamic programming over intermediate vertices','Use it for dense graphs or small vertex counts','Loop order must put intermediate k outside i and j','dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])'
    UNION ALL SELECT 'Graph','HARD','Kruskal MST','Builds a minimum spanning tree by sorting edges and using Union-Find','Use it for MST in sparse weighted undirected graphs','Adding an edge without cycle check breaks the tree property','sort edges by weight, union endpoints if separate'
    UNION ALL SELECT 'Graph','HARD','Tarjan SCC','Finds strongly connected components in a directed graph in O(V+E)','Use it to compress cycles in dependency graphs','Updating low-link values incorrectly splits components','low[u] = min(low[u], low[v])'
    UNION ALL SELECT 'Graph','HARD','max flow','Computes maximum possible flow from source to sink under capacities','Use it for matching, cuts, and capacity planning problems','Ignoring residual reverse edges prevents correcting earlier choices','add augmenting path flow in residual graph'
) c
CROSS JOIN (
    SELECT 'MEANING' kind, 'Meaning' title_suffix
    UNION ALL SELECT 'USE_CASE', 'Use Case'
    UNION ALL SELECT 'PITFALL', 'Pitfall'
    UNION ALL SELECT 'EXAMPLE', 'Example'
) v;

-- 5 coding questions per topic/difficulty.
INSERT INTO questions (title, description, type, difficulty, prep_field, topic, options_json, correct_answer)
SELECT title, description, 'CODING', difficulty, 'DSA', topic, NULL, correct_answer
FROM (
    SELECT 'Queue Push Pop' title, 'Write C++ code to push x into queue q and then remove the front element.' description, 'EASY' difficulty, 'Queue' topic, 'q.push(x); q.pop();' correct_answer
    UNION ALL SELECT 'Read Queue Front','Write C++ code to store the front element of queue q in variable x.','EASY','Queue','int x = q.front();'
    UNION ALL SELECT 'Queue Empty Check','Write a C++ if statement that runs when queue q is empty.','EASY','Queue','if(q.empty()) { }'
    UNION ALL SELECT 'Queue Size','Write C++ code to store the size of queue q in n.','EASY','Queue','int n = q.size();'
    UNION ALL SELECT 'BFS Start','Write C++ code to initialize BFS from src using queue q and visited array vis.','EASY','Queue','queue<int> q; q.push(src); vis[src] = true;'
    UNION ALL SELECT 'Circular Increment','Write C++ code to advance rear in a circular queue of capacity cap.','MEDIUM','Queue','rear = (rear + 1) % cap;'
    UNION ALL SELECT 'Priority Queue Max','Declare a C++ max priority_queue of integers named pq.','MEDIUM','Queue','priority_queue<int> pq;'
    UNION ALL SELECT 'Priority Queue Min','Declare a C++ min priority_queue of integers named pq.','MEDIUM','Queue','priority_queue<int, vector<int>, greater<int>> pq;'
    UNION ALL SELECT 'Deque Push Front','Write C++ code to push x to the front of deque dq.','MEDIUM','Queue','dq.push_front(x);'
    UNION ALL SELECT 'Two Stack Transfer','Move all elements from stack in to stack out in C++.','MEDIUM','Queue','while(!in.empty()){ out.push(in.top()); in.pop(); }'
    UNION ALL SELECT 'Zero One BFS Push','Write C++ ternary-style logic to push v to front when w is 0, otherwise back.','HARD','Queue','if(w == 0) dq.push_front(v); else dq.push_back(v);'
    UNION ALL SELECT 'Remove Old Window','Write C++ code to remove deque front if it is outside window ending at i of size k.','HARD','Queue','if(!dq.empty() && dq.front() <= i - k) dq.pop_front();'
    UNION ALL SELECT 'Maintain Max Deque','Write C++ code to pop smaller/equal elements from back before adding index i.','HARD','Queue','while(!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();'
    UNION ALL SELECT 'Kahn Push Zero','Write C++ code to push v when its indegree becomes zero after decrement.','HARD','Queue','if(--indeg[v] == 0) q.push(v);'
    UNION ALL SELECT 'Multi Source BFS Seed','Write C++ loop to seed queue q with all sources and set their dist to 0.','HARD','Queue','for(int s: sources){ dist[s] = 0; q.push(s); }'

    UNION ALL SELECT 'Tree Node Struct','Write a C++ struct Node with int val and left/right pointers.','EASY','Tree','struct Node { int val; Node *left, *right; };'
    UNION ALL SELECT 'Create Root','Write C++ code to create root as a new Node with value 10.','EASY','Tree','Node* root = new Node(10);'
    UNION ALL SELECT 'Leaf Check','Write a C++ condition that checks whether node is a leaf.','EASY','Tree','if(node && !node->left && !node->right) { }'
    UNION ALL SELECT 'BST Go Left','Write C++ code to move root to root->left when x is smaller than root->val.','EASY','Tree','if(x < root->val) root = root->left;'
    UNION ALL SELECT 'Recursive Inorder','Write one C++ line sequence for inorder traversal around visit(root).','EASY','Tree','inorder(root->left); visit(root); inorder(root->right);'
    UNION ALL SELECT 'Tree Height','Write C++ return statement for recursive tree height using left and right children.','MEDIUM','Tree','return 1 + max(height(root->left), height(root->right));'
    UNION ALL SELECT 'Level Queue Start','Write C++ code to initialize level-order traversal queue with root.','MEDIUM','Tree','queue<Node*> q; q.push(root);'
    UNION ALL SELECT 'Enqueue Children','Write C++ code to enqueue non-null left and right children of node.','MEDIUM','Tree','if(node->left) q.push(node->left); if(node->right) q.push(node->right);'
    UNION ALL SELECT 'Segment Merge','Write C++ code to merge segment tree children into tree[node] for sum queries.','MEDIUM','Tree','tree[node] = tree[node * 2] + tree[node * 2 + 1];'
    UNION ALL SELECT 'Heap Parent','Write C++ expression to compute parent index of heap index i.','MEDIUM','Tree','int parent = (i - 1) / 2;'
    UNION ALL SELECT 'LCA Base','Write C++ base condition for LCA when root is null, p, or q.','HARD','Tree','if(!root || root == p || root == q) return root;'
    UNION ALL SELECT 'Binary Lift Recurrence','Write C++ recurrence for up[v][k] using up[v][k-1].','HARD','Tree','up[v][k] = up[up[v][k-1]][k-1];'
    UNION ALL SELECT 'Fenwick Update','Write C++ Fenwick update loop adding delta at i up to n.','HARD','Tree','for(; i <= n; i += i & -i) bit[i] += delta;'
    UNION ALL SELECT 'Morris Thread','Write C++ code to create a Morris traversal temporary thread from pred to cur.','HARD','Tree','pred->right = cur; cur = cur->left;'
    UNION ALL SELECT 'Map Declaration','Declare a C++ ordered map from int to int named mp.','HARD','Tree','map<int,int> mp;'

    UNION ALL SELECT 'Adjacency Push','Write C++ code to add directed edge u -> v in adjacency list adj.','EASY','Graph','adj[u].push_back(v);'
    UNION ALL SELECT 'Undirected Edge','Write C++ code to add undirected edge between u and v.','EASY','Graph','adj[u].push_back(v); adj[v].push_back(u);'
    UNION ALL SELECT 'Visited Mark','Write C++ code to mark vertex u as visited.','EASY','Graph','visited[u] = true;'
    UNION ALL SELECT 'BFS Queue Start','Write C++ code to start BFS from src with queue q.','EASY','Graph','queue<int> q; q.push(src); visited[src] = true;'
    UNION ALL SELECT 'DFS Call','Write C++ code to call dfs on unvisited neighbor v.','EASY','Graph','if(!visited[v]) dfs(v);'
    UNION ALL SELECT 'Dijkstra Dist Init','Write C++ code to initialize dist[src] to 0 and push it into min-heap pq.','MEDIUM','Graph','dist[src] = 0; pq.push({0, src});'
    UNION ALL SELECT 'Dijkstra Skip Stale','Write C++ condition to skip stale heap entries with distance d for node u.','MEDIUM','Graph','if(d > dist[u]) continue;'
    UNION ALL SELECT 'Topo Push Zero','Write C++ code to push v into queue when indegree becomes zero.','MEDIUM','Graph','if(--indeg[v] == 0) q.push(v);'
    UNION ALL SELECT 'Union Find Compress','Write C++ path compression assignment inside find(x).','MEDIUM','Graph','parent[x] = find(parent[x]);'
    UNION ALL SELECT 'Bipartite Color','Write C++ code to assign neighbor v the opposite color of u.','MEDIUM','Graph','color[v] = color[u] ^ 1;'
    UNION ALL SELECT 'Bellman Relax','Write C++ relaxation condition for edge u -> v with weight w.','HARD','Graph','if(dist[u] != INF && dist[u] + w < dist[v]) dist[v] = dist[u] + w;'
    UNION ALL SELECT 'Floyd Update','Write C++ Floyd-Warshall update for i, j through k.','HARD','Graph','dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);'
    UNION ALL SELECT 'Kruskal Union','Write C++ condition to add edge if find(u) and find(v) are different.','HARD','Graph','if(find(u) != find(v)) unite(u, v);'
    UNION ALL SELECT 'Tarjan Lowlink','Write C++ code to update low[u] using low[v].','HARD','Graph','low[u] = min(low[u], low[v]);'
    UNION ALL SELECT 'Residual Capacity','Write C++ condition checking positive residual capacity cap[u][v].','HARD','Graph','if(cap[u][v] > 0) { }'
) coding;

SELECT prep_field, topic, difficulty, type, COUNT(*) AS question_count
FROM questions
WHERE prep_field = 'DSA'
  AND topic IN ('Queue', 'Tree', 'Graph')
GROUP BY prep_field, topic, difficulty, type
ORDER BY prep_field, topic, difficulty, type;
