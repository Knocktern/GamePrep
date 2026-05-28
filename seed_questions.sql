-- ============================================================
--  GamePrep — Question Seed Script
--  DB: gameprep_db   Table: questions
--  50 questions across OOP / DSA / OPERATING_SYSTEM / DBMS
-- ============================================================

USE gameprep_db;

TRUNCATE TABLE questions;

INSERT INTO questions (title, description, type, difficulty, prep_field, topic, options_json, correct_answer)
VALUES

-- ── OOP / Classes ──────────────────────────────────────────
('Class vs Object',
 'What is the difference between a class and an object in OOP?',
 'MCQ','EASY','OOP','Classes',
 '["A class is a blueprint; an object is an instance of that blueprint","A class and an object are the same thing","An object is a blueprint; a class is an instance","Classes exist at runtime; objects exist at compile time"]',
 'A class is a blueprint; an object is an instance of that blueprint'),

('Constructor Overloading',
 'Which concept allows a class to have multiple constructors with different parameter lists?',
 'MCQ','MEDIUM','OOP','Classes',
 '["Constructor chaining","Constructor overloading","Constructor hiding","Constructor delegation"]',
 'Constructor overloading'),

('Static Members',
 'A static member of a class belongs to ___.',
 'MCQ','HARD','OOP','Classes',
 '["Each object individually","The class itself, shared across all instances","The subclass only","The JVM heap exclusively"]',
 'The class itself, shared across all instances'),

-- ── OOP / Inheritance ──────────────────────────────────────
('Multiple Inheritance Problem',
 'Java does NOT directly support multiple inheritance through classes because:',
 'MCQ','EASY','OOP','Inheritance',
 '["Java is not object-oriented","It can cause the Diamond Problem with ambiguous method resolution","Java does not support any form of inheritance","Java classes are all final by default"]',
 'It can cause the Diamond Problem with ambiguous method resolution'),

('super Keyword',
 'What does the super() call inside a constructor do?',
 'MCQ','MEDIUM','OOP','Inheritance',
 '["Calls the current class constructor","Calls the parent class constructor","Instantiates the parent class","Deletes the child class object"]',
 'Calls the parent class constructor'),

('Method Hiding',
 'When a subclass defines a static method with the same signature as a parent static method, what happens?',
 'MCQ','HARD','OOP','Inheritance',
 '["The parent method is overridden","The parent method is overloaded","The parent method is hidden (method hiding), not overridden","A compile-time error is thrown"]',
 'The parent method is hidden (method hiding), not overridden'),

-- ── OOP / Polymorphism ─────────────────────────────────────
('Compile-time Polymorphism',
 'Method overloading is an example of which type of polymorphism?',
 'MCQ','EASY','OOP','Polymorphism',
 '["Runtime polymorphism","Compile-time polymorphism","Parametric polymorphism","Ad-hoc subtype polymorphism"]',
 'Compile-time polymorphism'),

('Upcasting',
 'Storing a child class object in a parent class reference variable is called:',
 'MCQ','MEDIUM','OOP','Polymorphism',
 '["Downcasting","Boxing","Upcasting","Coercion"]',
 'Upcasting'),

('Dynamic Dispatch',
 'Which mechanism allows Java to decide which overridden method to call at runtime based on the actual object type?',
 'MCQ','HARD','OOP','Polymorphism',
 '["Static dispatch","Dynamic method dispatch (virtual dispatch)","Late static binding","Compile-time resolution"]',
 'Dynamic method dispatch (virtual dispatch)'),

-- ── OOP / Encapsulation ────────────────────────────────────
('Access Modifiers',
 'Which access modifier restricts a field to be accessible only within its own class?',
 'MCQ','EASY','OOP','Encapsulation',
 '["public","protected","private","default (package-private)"]',
 'private'),

('Getters and Setters',
 'What is the primary purpose of getter and setter methods in encapsulation?',
 'MCQ','MEDIUM','OOP','Encapsulation',
 '["To increase code size","To provide controlled access and validation for private fields","To replace constructors","To enable multiple inheritance"]',
 'To provide controlled access and validation for private fields'),

('Encapsulation vs Abstraction',
 'Encapsulation differs from abstraction in that encapsulation focuses on:',
 'MCQ','HARD','OOP','Encapsulation',
 '["Hiding implementation details from the user","Bundling data and methods and restricting direct access","Defining interfaces","Achieving polymorphic behaviour"]',
 'Bundling data and methods and restricting direct access'),

-- ── DSA / Arrays ───────────────────────────────────────────
('Array Access Time',
 'What is the time complexity of accessing an element by index in a fixed-size array?',
 'MCQ','EASY','DSA','Arrays',
 '["O(n)","O(log n)","O(1)","O(n^2)"]',
 'O(1)'),

('Sorted Array Insertion',
 'What is the average-case time complexity of inserting an element into a sorted array (maintaining order)?',
 'MCQ','MEDIUM','DSA','Arrays',
 '["O(1)","O(log n)","O(n)","O(n log n)"]',
 'O(n)'),

('Kadane Algorithm',
 'Kadane algorithm solves which classic array problem in O(n) time?',
 'MCQ','HARD','DSA','Arrays',
 '["Finding the longest subarray with distinct elements","Maximum subarray sum (contiguous)","Finding all permutations of an array","Rotating an array k times"]',
 'Maximum subarray sum (contiguous)'),

-- ── DSA / Linked List ──────────────────────────────────────
('Singly vs Doubly Linked List',
 'Which node attribute does a doubly linked list have that a singly linked list does NOT?',
 'MCQ','EASY','DSA','Linked List',
 '["A data field","A pointer to the next node","A pointer to the previous node","A head reference"]',
 'A pointer to the previous node'),

('Cycle Detection',
 'Which algorithm efficiently detects a cycle in a linked list using O(1) extra space?',
 'MCQ','MEDIUM','DSA','Linked List',
 '["Depth-First Search (DFS)","Floyd Cycle Detection (Tortoise and Hare)","Binary search","Topological sort"]',
 'Floyd Cycle Detection (Tortoise and Hare)'),

('Reverse Linked List Complexity',
 'What is the time and space complexity of reversing a singly linked list iteratively?',
 'MCQ','HARD','DSA','Linked List',
 '["O(n) time, O(n) space","O(n) time, O(1) space","O(log n) time, O(1) space","O(1) time, O(1) space"]',
 'O(n) time, O(1) space'),

-- ── DSA / Stack ────────────────────────────────────────────
('LIFO Principle',
 'A stack follows which data structure principle?',
 'MCQ','EASY','DSA','Stack',
 '["FIFO (First In First Out)","LIFO (Last In First Out)","LILO (Last In Last Out)","Random access"]',
 'LIFO (Last In First Out)'),

('Balanced Parentheses',
 'Which data structure is most suitable for checking balanced parentheses in an expression?',
 'MCQ','MEDIUM','DSA','Stack',
 '["Queue","Stack","Binary tree","Hash map"]',
 'Stack'),

('Monotonic Stack Use Case',
 'A monotonic stack is used to solve which type of problem efficiently?',
 'MCQ','HARD','DSA','Stack',
 '["Sorting elements","Finding the next greater or smaller element for each array position","Graph traversal","Detecting duplicate values"]',
 'Finding the next greater or smaller element for each array position'),

-- ── DSA / Queue ────────────────────────────────────────────
('Queue Remove Operation',
 'Which operation removes the front element from a queue?',
 'MCQ','EASY','DSA','Queue',
 '["push()","pop()","dequeue() or poll()","peek()"]',
 'dequeue() or poll()'),

('Priority Queue Extraction',
 'In a max-heap based priority queue, what is the time complexity of extracting the maximum element?',
 'MCQ','MEDIUM','DSA','Queue',
 '["O(1)","O(n)","O(log n)","O(n log n)"]',
 'O(log n)'),

('Circular Queue Advantage',
 'What is the main advantage of a circular queue over a simple linear queue?',
 'MCQ','HARD','DSA','Queue',
 '["It allows faster search","It reuses freed space at the front of the queue avoiding wasted memory","It allows duplicate removal in O(1)","It supports priority ordering natively"]',
 'It reuses freed space at the front of the queue avoiding wasted memory'),

-- ── DSA / Tree ─────────────────────────────────────────────
('BST Property',
 'In a Binary Search Tree, which condition always holds for a node N?',
 'MCQ','EASY','DSA','Tree',
 '["All nodes in left subtree > N and all in right subtree < N","All nodes in left subtree < N and all in right subtree > N","Left and right subtrees are always equal in height","The tree is always perfectly balanced"]',
 'All nodes in left subtree < N and all in right subtree > N'),

('Tree Traversal Order',
 'Which traversal visits nodes in the order: Left, Root, Right?',
 'MCQ','MEDIUM','DSA','Tree',
 '["Pre-order","Post-order","In-order","Level-order"]',
 'In-order'),

('AVL LR Rotation',
 'An AVL tree performs a Left-Right (LR) rotation to fix which imbalance scenario?',
 'MCQ','HARD','DSA','Tree',
 '["Node inserted into right subtree of right child","Node inserted into left subtree of left child","Node inserted into right subtree of left child","Node inserted into left subtree of right child"]',
 'Node inserted into right subtree of left child'),

-- ── DSA / Graph ────────────────────────────────────────────
('BFS Data Structure',
 'Which algorithm uses a queue internally for graph traversal?',
 'MCQ','EASY','DSA','Graph',
 '["Depth-First Search (DFS)","Breadth-First Search (BFS)","Dijkstra algorithm","Topological Sort"]',
 'Breadth-First Search (BFS)'),

('Dijkstra Limitation',
 'Dijkstra shortest path algorithm does NOT work correctly when the graph contains:',
 'MCQ','MEDIUM','DSA','Graph',
 '["Directed edges","Negative weight edges","Cycles","Disconnected components"]',
 'Negative weight edges'),

('Topological Sort Applicability',
 'Topological sorting can only be applied to which type of graph?',
 'MCQ','HARD','DSA','Graph',
 '["Undirected cyclic graphs","Directed Acyclic Graphs (DAG)","Weighted undirected graphs","Bipartite graphs only"]',
 'Directed Acyclic Graphs (DAG)'),

-- ── OPERATING_SYSTEM / Bash Script ─────────────────────────
('Shebang Line',
 'What is the purpose of #!/bin/bash at the very first line of a shell script?',
 'MCQ','EASY','OPERATING_SYSTEM','Bash Script',
 '["It is a comment ignored by the shell","It specifies the interpreter to use when executing the script","It imports the bash library","It declares the script as executable"]',
 'It specifies the interpreter to use when executing the script'),

('Command Substitution',
 'Which syntax correctly stores the output of a command into a variable in Bash?',
 'MCQ','MEDIUM','OPERATING_SYSTEM','Bash Script',
 '["var = command","var=$(command)","var=#{command}","var=<command>"]',
 'var=$(command)'),

('Exit Codes',
 'In Bash, what does a non-zero exit code from a script or command indicate?',
 'MCQ','HARD','OPERATING_SYSTEM','Bash Script',
 '["Successful execution","An error or failure occurred","The process is still running","The command produced no output"]',
 'An error or failure occurred'),

-- ── OPERATING_SYSTEM / Process ─────────────────────────────
('Process States',
 'Which of the following is NOT a typical process state in an operating system?',
 'MCQ','EASY','OPERATING_SYSTEM','Process',
 '["Running","Waiting / Blocked","Ready","Compiling"]',
 'Compiling'),

('Fork Return Value',
 'What does the fork() system call return in the child process?',
 'MCQ','MEDIUM','OPERATING_SYSTEM','Process',
 '["The PID of the child process","0","-1","The PID of the parent process"]',
 '0'),

('Zombie Process',
 'A zombie process is one that has:',
 'MCQ','HARD','OPERATING_SYSTEM','Process',
 '["Not yet started execution","Completed execution but its entry still exists in the process table","Been terminated by the OS for using too much memory","Lost its parent process and been orphaned"]',
 'Completed execution but its entry still exists in the process table'),

-- ── OPERATING_SYSTEM / Thread ──────────────────────────────
('Thread vs Process Memory',
 'Threads within the same process share:',
 'MCQ','EASY','OPERATING_SYSTEM','Thread',
 '["Separate memory spaces","The same code, data, and open files but have their own stacks","Separate PCBs (Process Control Blocks)","Separate open file descriptors"]',
 'The same code, data, and open files but have their own stacks'),

('Race Condition',
 'A race condition occurs when:',
 'MCQ','MEDIUM','OPERATING_SYSTEM','Thread',
 '["Two threads never share data","The outcome of concurrent threads depends on the unpredictable order of their execution","A thread finishes before another starts","Memory is allocated incorrectly"]',
 'The outcome of concurrent threads depends on the unpredictable order of their execution'),

('Deadlock Coffman Conditions',
 'Which four conditions must ALL be present simultaneously for deadlock to occur?',
 'MCQ','HARD','OPERATING_SYSTEM','Thread',
 '["Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait","Mutual Exclusion, Preemption, Starvation, Priority Inversion","Hold and Wait, Circular Wait, Parallelism, Interruption","No Preemption, Circular Wait, Concurrency, Starvation"]',
 'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait'),

-- ── OPERATING_SYSTEM / Memory Management ───────────────────
('Paging Fragmentation',
 'In OS memory management, paging eliminates:',
 'MCQ','EASY','OPERATING_SYSTEM','Memory Management',
 '["Internal fragmentation","External fragmentation","Thrashing","Page faults"]',
 'External fragmentation'),

('LRU Page Replacement',
 'The Least Recently Used (LRU) page replacement policy evicts:',
 'MCQ','MEDIUM','OPERATING_SYSTEM','Memory Management',
 '["The page that will not be used for the longest time in the future","The page that was loaded most recently","The page that was least recently accessed","A random page"]',
 'The page that was least recently accessed'),

('Thrashing',
 'Thrashing in a virtual memory system occurs when:',
 'MCQ','HARD','OPERATING_SYSTEM','Memory Management',
 '["The CPU is idle because all processes are sleeping","The OS spends more time swapping pages than executing processes","A single process consumes all physical RAM","The TLB is too small"]',
 'The OS spends more time swapping pages than executing processes'),

-- ── DBMS / SQL Basics ──────────────────────────────────────
('WHERE vs HAVING',
 'Which SQL clause is used to filter rows returned by a SELECT query before grouping?',
 'MCQ','EASY','DBMS','SQL Basics',
 '["ORDER BY","GROUP BY","WHERE","HAVING"]',
 'WHERE'),

('INNER JOIN Result',
 'An INNER JOIN returns:',
 'MCQ','MEDIUM','DBMS','SQL Basics',
 '["All rows from the left table and matching rows from the right table","All rows from both tables regardless of match","Only rows that have matching values in both tables","Only rows from the right table that have no match in the left table"]',
 'Only rows that have matching values in both tables'),

('COUNT Aggregate',
 'Which SQL aggregate function returns the number of non-NULL rows matching a condition?',
 'MCQ','HARD','DBMS','SQL Basics',
 '["SUM()","AVG()","COUNT()","MAX()"]',
 'COUNT()'),

-- ── DBMS / Normalization ───────────────────────────────────
('1NF Requirement',
 'A table is in First Normal Form (1NF) when:',
 'MCQ','EASY','DBMS','Normalization',
 '["All non-key attributes are fully functionally dependent on the primary key","Every column contains atomic (indivisible) values and each row is unique","There are no transitive dependencies","Every attribute depends only on the primary key"]',
 'Every column contains atomic (indivisible) values and each row is unique'),

('3NF vs 2NF',
 'Third Normal Form (3NF) eliminates which type of dependency over 2NF?',
 'MCQ','MEDIUM','DBMS','Normalization',
 '["Partial dependencies","Multi-valued dependencies","Transitive dependencies","Join dependencies"]',
 'Transitive dependencies'),

('BCNF Requirement',
 'Boyce-Codd Normal Form (BCNF) requires:',
 'MCQ','HARD','DBMS','Normalization',
 '["For every functional dependency X to Y, X must be a super key","Elimination of all multi-valued dependencies","All attributes to be in the primary key","No join dependencies in the relation"]',
 'For every functional dependency X to Y, X must be a super key'),

-- ── DBMS / Indexing ────────────────────────────────────────
('Index Purpose',
 'What is the primary purpose of a database index?',
 'MCQ','EASY','DBMS','Indexing',
 '["To enforce referential integrity","To speed up data retrieval operations on a table","To compress table data on disk","To prevent duplicate rows"]',
 'To speed up data retrieval operations on a table'),

('B-Tree Index Use Case',
 'B-Tree indexes are well suited for:',
 'MCQ','MEDIUM','DBMS','Indexing',
 '["Equality lookups only","Full-text search","Range queries and equality lookups","Storing JSON documents"]',
 'Range queries and equality lookups'),

('Clustered Index Limit',
 'How many clustered indexes can a single table have?',
 'MCQ','HARD','DBMS','Indexing',
 '["Unlimited","As many as there are columns","Only one","Up to 10"]',
 'Only one'),

-- ── DBMS / Transactions ────────────────────────────────────
('ACID Durability',
 'Which ACID property guarantees that a committed transaction remains permanent even after a system failure?',
 'MCQ','EASY','DBMS','Transactions',
 '["Atomicity","Consistency","Isolation","Durability"]',
 'Durability'),

('READ COMMITTED Isolation',
 'The READ COMMITTED isolation level prevents which concurrency problem?',
 'MCQ','MEDIUM','DBMS','Transactions',
 '["Phantom reads","Non-repeatable reads","Dirty reads","Lost updates"]',
 'Dirty reads'),

('Two-Phase Locking',
 'In Two-Phase Locking (2PL), the shrinking phase begins when:',
 'MCQ','HARD','DBMS','Transactions',
 '["The transaction starts acquiring locks","The first lock is released and no new locks are acquired","COMMIT is issued","The transaction encounters a deadlock"]',
 'The first lock is released and no new locks are acquired');

-- ── Verification ───────────────────────────────────────────
SELECT prep_field, topic, difficulty, COUNT(*) AS question_count
FROM questions
GROUP BY prep_field, topic, difficulty
ORDER BY prep_field, topic, difficulty;
