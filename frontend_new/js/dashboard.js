const TOPICS = {
  OOP: ["Classes", "Inheritance", "Polymorphism", "Encapsulation"],
  DSA: ["Arrays", "Linked List", "Stack", "Queue", "Tree", "Graph"],
  OPERATING_SYSTEM: ["Bash Script", "Process", "Thread", "Memory Management"],
  DBMS: ["SQL Basics", "Normalization", "Indexing", "Transactions"],
};

const INTEL_DATA = {
  "Classes": {
    text: `
      <h4 style="color:var(--neon-green)">Java Classes and Objects</h4>
      <p>Java is an object-oriented programming language. Everything in Java is associated with classes and objects, along with its attributes and methods. For example: in real life, a car is an object. The car has attributes, such as weight and color, and methods, such as drive and brake.</p>
      <p>A Class is like an object constructor, or a "blueprint" for creating objects.</p>
      <h5 style="color:var(--neon-blue)">Create a Class</h5>
      <pre style="background:#222; padding:10px; border-radius:4px; font-family:var(--font-main);"><code>public class Main {
  int x = 5;
}</code></pre>
      <h5 style="color:var(--neon-blue)">Create an Object</h5>
      <p>To create an object of <code>Main</code>, specify the class name, followed by the object name, and use the keyword <code>new</code>:</p>
      <pre style="background:#222; padding:10px; border-radius:4px; font-family:var(--font-main);"><code>public class Main {
  int x = 5;

  public static void main(String[] args) {
    Main myObj = new Main();
    System.out.println(myObj.x);
  }
}</code></pre>
    `,
    docs: [{ label: "W3Schools - Java Classes", url: "https://www.w3schools.com/java/java_classes.asp" }],
    videos: [{ label: "Java Classes & Objects", url: "https://www.youtube.com/watch?v=WPvGqX-TXP0" }]
  },
  "Inheritance": {
    text: `
      <h4 style="color:var(--neon-green)">Java Inheritance (Subclass and Superclass)</h4>
      <p>In Java, it is possible to inherit attributes and methods from one class to another. We group the "inheritance concept" into two categories:</p>
      <ul>
        <li><strong>subclass</strong> (child) - the class that inherits from another class</li>
        <li><strong>superclass</strong> (parent) - the class being inherited from</li>
      </ul>
      <p>To inherit from a class, use the <code>extends</code> keyword.</p>
      <pre style="background:#222; padding:10px; border-radius:4px; font-family:var(--font-main);"><code>class Vehicle {
  protected String brand = "Ford";
  public void honk() {
    System.out.println("Tuut, tuut!");
  }
}

class Car extends Vehicle {
  private String modelName = "Mustang";
  public static void main(String[] args) {
    Car myCar = new Car();
    myCar.honk();
  }
}</code></pre>
    `,
    docs: [{ label: "W3Schools - Inheritance", url: "https://www.w3schools.com/java/java_inheritance.asp" }],
    videos: [{ label: "Inheritance Explained", url: "https://www.youtube.com/watch?v=QsicEGHCqH8" }]
  },
  "Polymorphism": {
    text: `
      <h4 style="color:var(--neon-green)">Java Polymorphism</h4>
      <p>Polymorphism means "many forms", and it occurs when we have many classes that are related to each other by inheritance. It allows us to perform a single action in different ways.</p>
      <pre style="background:#222; padding:10px; border-radius:4px; font-family:var(--font-main);"><code>class Animal {
  public void animalSound() {
    System.out.println("The animal makes a sound");
  }
}

class Pig extends Animal {
  public void animalSound() {
    System.out.println("The pig says: wee wee");
  }
}</code></pre>
      <p>Why And When To Use "Inheritance" and "Polymorphism"? It is useful for code reusability: reuse attributes and methods of an existing class when you create a new class.</p>
    `,
    docs: [{ label: "Java Polymorphism", url: "https://www.w3schools.com/java/java_polymorphism.asp" }],
    videos: [{ label: "Polymorphism Explained", url: "https://www.youtube.com/watch?v=ZaEJeHhOQ0c" }]
  },
  "Encapsulation": {
    text: `
      <h4 style="color:var(--neon-green)">Java Encapsulation</h4>
      <p>The meaning of Encapsulation, is to make sure that "sensitive" data is hidden from users. To achieve this, you must:</p>
      <ul>
        <li>declare class variables/attributes as <code>private</code></li>
        <li>provide public <strong>get</strong> and <strong>set</strong> methods to access and update the value of a <code>private</code> variable</li>
      </ul>
      <pre style="background:#222; padding:10px; border-radius:4px; font-family:var(--font-main);"><code>public class Person {
  private String name; // private = restricted access

  // Getter
  public String getName() {
    return name;
  }

  // Setter
  public void setName(String newName) {
    this.name = newName;
  }
}</code></pre>
    `,
    docs: [{ label: "Encapsulation - GeeksforGeeks", url: "https://www.geeksforgeeks.org/encapsulation-in-java/" }],
    videos: [{ label: "Encapsulation in Java", url: "https://www.youtube.com/watch?v=oTzQGkmXJmY" }]
  },
  "Arrays": {
    text: `
      <h4 style="color:var(--neon-green)">Data Structures: Arrays</h4>
      <p>An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.</p>
      <p>Because they are stored contiguously, calculating the position of each element is simply a matter of adding an offset to a base value. This yields $O(1)$ time complexity for accesses.</p>
      <pre style="background:#222; padding:10px; border-radius:4px; font-family:var(--font-main);"><code>// Declaring an array
int[] arr = new int[5];
// Initializing an array
arr[0] = 10;
arr[1] = 20;

// Array literal
int[] myNum = {10, 20, 30, 40};</code></pre>
      <p><strong>Pros:</strong> Fast lookup by index. <strong>Cons:</strong> Fixed size, and insertions/deletions in the middle require shifting elements ($O(N)$).</p>
    `,
    docs: [{ label: "W3Schools - Java Arrays", url: "https://www.w3schools.com/java/java_arrays.asp" }],
    videos: [{ label: "Data Structures: Arrays", url: "https://www.youtube.com/watch?v=1j9AioE6u3E" }]
  },
  "Linked List": {
    text: `
      <h4 style="color:var(--neon-green)">Data Structures: Linked List</h4>
      <p>A Linked List is a linear data structure, in which the elements are not stored at contiguous memory locations. The elements in a linked list are linked using pointers.</p>
      <p>In simple words, a linked list consists of nodes where each node contains a data field and a reference(link) to the next node in the list.</p>
      <pre style="background:#222; padding:10px; border-radius:4px; font-family:var(--font-main);"><code>class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}</code></pre>
      <p><strong>Pros:</strong> Dynamic size, easy insertions and deletions $O(1)$ when at the head. <strong>Cons:</strong> Cannot be randomly accessed $O(N)$ lookup. Extra memory space for a pointer is required with each element of the list.</p>
    `,
    docs: [{ label: "GeeksforGeeks - Linked List", url: "https://www.geeksforgeeks.org/data-structures/linked-list/" }],
    videos: [{ label: "Introduction to Linked Lists", url: "https://www.youtube.com/watch?v=njTh_OwMmlA" }]
  },
  "Stack": {
    text: `
      <h4 style="color:var(--neon-green)">Data Structures: Stack</h4>
      <p>Stack is a linear data structure which follows a particular order in which the operations are performed. The order may be LIFO(Last In First Out) or FILO(First In Last Out).</p>
      <p>Mainly the following three basic operations are performed in the stack:</p>
      <ul>
        <li><strong>Push:</strong> Adds an item in the stack.</li>
        <li><strong>Pop:</strong> Removes an item from the stack.</li>
        <li><strong>Peek or Top:</strong> Returns top element of stack.</li>
      </ul>
      <p>Stacks are commonly used for Undo features, handling function calls (Call Stack), and expression evaluation.</p>
    `,
    docs: [{ label: "Stack Data Structure", url: "https://www.geeksforgeeks.org/stack-data-structure/" }],
    videos: [{ label: "Data Structures: Stacks", url: "https://www.youtube.com/watch?v=F1F2imiAOj8" }]
  },
  "Queue": {
    text: `
      <h4 style="color:var(--neon-green)">Data Structures: Queue</h4>
      <p>A Queue is a linear structure which follows a particular order in which the operations are performed. The order is First In First Out (FIFO).</p>
      <p>A good example of a queue is any queue of consumers for a resource where the consumer that came first is served first.</p>
      <ul>
        <li><strong>Enqueue:</strong> Adds an item to the queue. If the queue is full, then it is said to be an Overflow condition.</li>
        <li><strong>Dequeue:</strong> Removes an item from the queue. The items are popped in the same order in which they are pushed.</li>
      </ul>
    `,
    docs: [{ label: "Queue Data Structure", url: "https://www.geeksforgeeks.org/queue-data-structure/" }],
    videos: [{ label: "Data Structures: Queues", url: "https://www.youtube.com/watch?v=wjI1WNcIntg" }]
  },
  "Tree": {
    text: `
      <h4 style="color:var(--neon-green)">Data Structures: Tree</h4>
      <p>Unlike Arrays, Linked Lists, Stack and queues, which are linear data structures, trees are hierarchical data structures. A tree whose elements have at most 2 children is called a binary tree.</p>
      <p><strong>Vocabulary:</strong></p>
      <ul>
        <li><strong>Root:</strong> The topmost node of the tree.</li>
        <li><strong>Edge:</strong> The link between two nodes.</li>
        <li><strong>Child:</strong> A node that has a parent node.</li>
        <li><strong>Leaf:</strong> A node that does not have any child node in the tree.</li>
      </ul>
      <p>Binary Search Trees (BST) keep their keys in sorted order, so that lookup and other operations can use the principle of binary search.</p>
    `,
    docs: [{ label: "GeeksforGeeks - Trees", url: "https://www.geeksforgeeks.org/binary-tree-data-structure/" }],
    videos: [{ label: "Trees Data Structure", url: "https://www.youtube.com/watch?v=oSWTXtMglKE" }]
  },
  "Graph": {
    text: `
      <h4 style="color:var(--neon-green)">Data Structures: Graph</h4>
      <p>A Graph is a non-linear data structure consisting of nodes and edges. The nodes are sometimes also referred to as vertices and the edges are lines or arcs that connect any two nodes in the graph.</p>
      <p>Graphs are used to solve routing problems like finding the shortest path (e.g., GPS, Google Maps).</p>
      <ul>
        <li><strong>Directed Graph (Digraph):</strong> A graph where edges have a direction.</li>
        <li><strong>Undirected Graph:</strong> A graph where edges are bidirectional.</li>
      </ul>
    `,
    docs: [{ label: "GeeksforGeeks - Graph", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" }],
    videos: [{ label: "Graph Theory Introduction", url: "https://www.youtube.com/watch?v=DBRW8nwZVks" }]
  },
  "Bash Script": {
    text: `
      <h4 style="color:var(--neon-green)">OS: Bash Scripting</h4>
      <p>Bash (Bourne Again SHell) is a Unix shell and command language. A Bash script is a plain text file which contains a series of commands.</p>
      <pre style="background:#222; padding:10px; border-radius:4px; font-family:var(--font-main);"><code>#!/bin/bash
# This is a comment
echo "Hello, Cyber World!"
NAME="Player1"
echo "Welcome $NAME!"
</code></pre>
      <p>Scripts are heavily used for automation, managing regular OS tasks, server monitoring, etc.</p>
    `,
    docs: [{ label: "Bash Scripting Tutorial", url: "https://www.geeksforgeeks.org/bash-scripting-tutorial/" }],
    videos: [{ label: "Bash Scripting Full Course", url: "https://www.youtube.com/watch?v=e7BufAVwDiM" }]
  },
  "Process": {
    text: `
      <h4 style="color:var(--neon-green)">OS: Process Management</h4>
      <p>A process is basically a program in execution. The execution of a process must progress in a sequential fashion. When you write a C or Java program, that is just code. When you run it, it becomes a process.</p>
      <p>Processes contain multiple segments:</p>
      <ul>
        <li><strong>Text section:</strong> The compiled program code</li>
        <li><strong>Data section:</strong> Global and static variables</li>
        <li><strong>Heap:</strong> Memory dynamically allocated at run time</li>
        <li><strong>Stack:</strong> Local variables and function call parameters</li>
      </ul>
    `,
    docs: [{ label: "GeeksforGeeks - OS Processes", url: "https://www.geeksforgeeks.org/introduction-of-process-management/" }],
    videos: [{ label: "Process Management in OS", url: "https://www.youtube.com/watch?v=OrM7nZcxXZU" }]
  },
  "Thread": {
    text: `
      <h4 style="color:var(--neon-green)">OS: Threads</h4>
      <p>A thread is a path of execution within a process. A process can contain multiple threads.</p>
      <p><strong>Thread vs Process:</strong></p>
      <ul>
        <li>Threads are easier to create than processes since they don't require a separate address space.</li>
        <li>Multithreading requires careful programming since threads share data structures that should only be modified by one thread at a time (see synchronization, mutexes, locks).</li>
      </ul>
    `,
    docs: [{ label: "Threads in OS", url: "https://www.geeksforgeeks.org/thread-in-operating-system/" }],
    videos: [{ label: "Threads and Concurrency", url: "https://www.youtube.com/watch?v=LOfGJcVnvAk" }]
  },
  "Memory Management": {
    text: `
      <h4 style="color:var(--neon-green)">OS: Memory Management</h4>
      <p>Memory management is the functionality of an operating system which handles or manages primary memory and moves processes back and forth between main memory and disk during execution.</p>
      <ul>
        <li><strong>Paging:</strong> A memory management scheme that eliminates the need for contiguous allocation of physical memory.</li>
        <li><strong>Virtual Memory:</strong> A technique that creates the illusion of a very large (main) memory by using secondary storage (disk) to page out rarely used data.</li>
      </ul>
    `,
    docs: [{ label: "OS Memory Management", url: "https://www.geeksforgeeks.org/memory-management-in-operating-system/" }],
    videos: [{ label: "Operating Systems: Memory Management", url: "https://www.youtube.com/watch?v=qcBIvnQOOwk" }]
  },
  "SQL Basics": {
    text: `
      <h4 style="color:var(--neon-green)">DBMS: SQL Basics</h4>
      <p>SQL stands for Structured Query Language. It is used to interact with relational databases.</p>
      <pre style="background:#222; padding:10px; border-radius:4px; font-family:var(--font-main);"><code>-- Select all columns from a table
SELECT * FROM Users;

-- Filter records
SELECT Username, Email FROM Users WHERE Age >= 18;

-- Insert a new record
INSERT INTO Users (Username, Age) VALUES ('Neo', 25);
</code></pre>
      <p>CRUD operations map to SQL as: Create -> INSERT, Read -> SELECT, Update -> UPDATE, Delete -> DELETE.</p>
    `,
    docs: [{ label: "W3Schools - SQL Tutorial", url: "https://www.w3schools.com/sql/" }],
    videos: [{ label: "SQL Basics for Beginners", url: "https://www.youtube.com/watch?v=zsjvFFKOm3c" }]
  },
  "Normalization": {
    text: `
      <h4 style="color:var(--neon-green)">DBMS: Normalization</h4>
      <p>Normalization is the process of organizing data in a database. This includes creating tables and establishing relationships between those tables according to rules designed both to protect the data and to make the database more flexible by eliminating redundancy.</p>
      <ul>
        <li><strong>1NF (First Normal Form):</strong> Each table cell should contain a single value (atomic).</li>
        <li><strong>2NF (Second Normal Form):</strong> 1NF + all non-key attributes are fully dependent on the primary key.</li>
        <li><strong>3NF (Third Normal Form):</strong> 2NF + there are no transitive dependencies.</li>
      </ul>
    `,
    docs: [{ label: "GeeksforGeeks - Normalization", url: "https://www.geeksforgeeks.org/introduction-of-database-normalization/" }],
    videos: [{ label: "Database Normalization Explained", url: "https://www.youtube.com/watch?v=GFQaEYEc8_8" }]
  },
  "Indexing": {
    text: `
      <h4 style="color:var(--neon-green)">DBMS: Indexing</h4>
      <p>Indexing is a way to optimize the performance of a database by minimizing the number of disk accesses required when a query is processed. It is a data structure technique which is used to quickly locate and access the data in a database.</p>
      <p>Indexes are created using a few database columns. Just like an index in a book helps you locate a specific chapter quickly, a database index helps the SQL engine locate the data quickly.</p>
      <p><em>Trade-off:</em> Indexes speed up SELECT queries but slow down UPDATE and INSERT queries since the index must also be updated.</p>
    `,
    docs: [{ label: "GeeksforGeeks - Database Indexing", url: "https://www.geeksforgeeks.org/indexing-in-databases-set-1/" }],
    videos: [{ label: "SQL Indexing and Tuning", url: "https://www.youtube.com/watch?v=HrvXbQCR4ZI" }]
  },
  "Transactions": {
    text: `
      <h4 style="color:var(--neon-green)">DBMS: Transactions (ACID)</h4>
      <p>A transaction is a single logical unit of work which accesses and possibly modifies the contents of a database. Transactions must possess four properties known as ACID.</p>
      <ul>
        <li><strong>Atomicity:</strong> All operations in the transaction succeed, or generally none of them do (all or nothing).</li>
        <li><strong>Consistency:</strong> The database must remain in a consistent state after any transaction. No integrity constraints are violated.</li>
        <li><strong>Isolation:</strong> Concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially.</li>
        <li><strong>Durability:</strong> Once a transaction has been committed, it will remain so, even in the event of power loss.</li>
      </ul>
    `,
    docs: [{ label: "GeeksforGeeks - Transaction Management", url: "https://www.geeksforgeeks.org/transaction-in-dbms/" }],
    videos: [{ label: "ACID Properties in DBMS", url: "https://www.youtube.com/watch?v=Cj1Rbs20ZHI" }]
  }
};

let currentUser = null;

document.addEventListener("DOMContentLoaded", async () => {
  currentUser = await checkAuth();
  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  // Update Top Nav
  document.getElementById("playerName").textContent = currentUser.username;
  document.getElementById("playerLvl").textContent = `LVL ${currentUser.level || 0}`;

  loadLeaderboard();

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const stepIntel = document.getElementById("stepIntel");
  const step3 = document.getElementById("step3");
  
  const subjectsContainer = document.getElementById("subjectsContainer");
  const topicsContainer = document.getElementById("topicsContainer");
  const launchBtn = document.getElementById("launchBtn");
  const msgBox = document.getElementById("gameError");

  let selectedField = "";
  let selectedTopic = "";
  let selectedDiff = "MEDIUM";

  function showError(msg) {
      msgBox.textContent = msg;
      msgBox.classList.add("visible");
      setTimeout(() => msgBox.classList.remove("visible"), 3000);
  }

  // Render Step 1: Subjects
  let subjectHTML = '';
  for (const field in TOPICS) {
      subjectHTML += `
      <div class="level-card" style="cursor:pointer;" onclick="selectSubject('${field}')">
          <div class="topic-name" style="text-align:center; margin-top:0.5rem; color:var(--neon-green); font-family:var(--font-retro); font-size:1.2rem;">
            ${field.replace("_", " ")}
          </div>
      </div>
      `;
  }
  subjectsContainer.innerHTML = subjectHTML;

  window.selectSubject = function(field) {
      selectedField = field;
      step1.classList.add("hidden");
      step2.classList.remove("hidden");
      
      // Render Topics
      let topicHTML = '';
      TOPICS[field].forEach(topic => {
          topicHTML += `
          <div class="level-card" style="cursor:pointer; border-color:var(--neon-blue);" onclick="selectTopic('${topic}')">
              <div class="topic-name" style="text-align:center; margin-top:0.5rem; color:var(--text-main); font-size:1.5rem;">
                ${topic}
              </div>
          </div>
          `;
      });
      topicsContainer.innerHTML = topicHTML;
  };

  window.selectTopic = function(topic) {
      selectedTopic = topic;
      step2.classList.add("hidden");
      stepIntel.classList.remove("hidden");

      // Populate Intel Data
      const intel = INTEL_DATA[topic] || { text: "No intel available.", docs: [], videos: [] };
      document.getElementById("intelTopicName").textContent = topic;
      document.getElementById("intelText").innerHTML = intel.text;

      const linksDiv = document.getElementById("intelLinks");
      linksDiv.innerHTML = "";
      (intel.docs || []).forEach(doc => {
          const a = document.createElement("a");
          a.href = doc.url;
          a.target = "_blank";
          a.textContent = `[+] ${doc.label}`;
          a.style.display = "block";
          a.style.color = "var(--neon-green)";
          a.style.marginBottom = "5px";
          linksDiv.appendChild(a);
      });
      if (!intel.docs || intel.docs.length === 0) linksDiv.innerHTML = "No readings available.";

      const videoDiv = document.getElementById("intelVideo");
      videoDiv.innerHTML = "";
      (intel.videos || []).forEach(vid => {
          const a = document.createElement("a");
          a.href = vid.url;
          a.target = "_blank";
          a.textContent = `[►] ${vid.label}`;
          a.style.display = "block";
          a.style.color = "var(--neon-red)";
          a.style.marginBottom = "5px";
          videoDiv.appendChild(a);
      });
      if (!intel.videos || intel.videos.length === 0) videoDiv.innerHTML = "No videos available.";
  };

  // Back actions
  document.getElementById("backToSubjectsBtn").addEventListener("click", () => {
      step2.classList.add("hidden");
      step1.classList.remove("hidden");
  });
  
  document.getElementById("backToTopicsBtnFromIntel").addEventListener("click", () => {
      stepIntel.classList.add("hidden");
      step2.classList.remove("hidden");
  });

  document.getElementById("proceedToConfigBtn").addEventListener("click", () => {
      stepIntel.classList.add("hidden");
      step3.classList.remove("hidden");
  });
  
  document.getElementById("backToIntelBtn").addEventListener("click", () => {
      step3.classList.add("hidden");
      stepIntel.classList.remove("hidden");
  });

  // Difficulty selections
  document.querySelectorAll(".diff-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
          document.querySelectorAll(".diff-btn").forEach(b => b.classList.remove("active"));
          e.target.classList.add("active");
          selectedDiff = e.target.getAttribute("data-val");
      });
  });

  // Launch handling
  launchBtn.addEventListener("click", async () => {
      const count = parseInt(document.getElementById("qCount").value);

      if (isNaN(count) || count < 1) {
          showError("ROUTING ERROR: Invalid Enemy Count.");
          return;
      }

      try {
          launchBtn.disabled = true;
          launchBtn.textContent = "UPLOADING CONFIG...";

          const payload = {
              prepField: selectedField,
              topic: selectedTopic,
              difficulty: selectedDiff,
              numberOfQuestions: count
          };

          const res = await apiCall("/game/start", "POST", payload);
          sessionStorage.setItem("current_game", JSON.stringify(res));
          window.location.href = "arena.html";

      } catch (err) {
          showError(`SYSTEM FAILURE: ${err.message}`);
          launchBtn.disabled = false;
          launchBtn.textContent = "INITIATE COMBAT SEQUENCE";
      }
  });

});

async function loadLeaderboard() {
  const container = document.getElementById("leaderboardList");
  try {
      const players = await apiCall("/players");
      if (!Array.isArray(players) || players.length === 0) {
          container.innerHTML = '<div class="text-center mt-1 text-muted">No combatants found.</div>';
          return;
      }

      // Sort by XP then Level
      players.sort((a, b) => (b.xp || 0) - (a.xp || 0));

      container.innerHTML = players.map((p, index) => {
          let extraClass = index === 0 ? "top-1" : index === 1 ? "top-2" : index === 2 ? "top-3" : "";
          let prefix = index < 3 ? ["👑", "🥈", "🥉"][index] : `#${index + 1}`;
          
          return `
          <div class="lb-row ${extraClass}">
              <span>${prefix} ${p.username}</span>
              <span>Lv.${p.level || 0} (${p.xp || 0} XP)</span>
          </div>
          `;
      }).join('');
      
  } catch (e) {
      container.innerHTML = '<div class="text-center mt-1 text-danger">Network Error</div>';
  }
}