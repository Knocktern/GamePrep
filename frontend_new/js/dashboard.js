const TOPICS = {
  OOP: ["Classes", "Inheritance", "Polymorphism", "Encapsulation"],
  DSA: ["Arrays", "Linked List", "Stack", "Queue", "Tree", "Graph"],
  OPERATING_SYSTEM: ["Bash Script", "Process", "Thread", "Memory Management"],
  DBMS: ["SQL Basics", "Normalization", "Indexing", "Transactions"],
};

// ─────────────────────────────────────────────────────────────────────────────
// INTEL_DATA  —  3 tiers per topic: EASY | MEDIUM | HARD
// Each tier has: text (HTML), docs [], videos []
// ─────────────────────────────────────────────────────────────────────────────
const INTEL_DATA = {

  // ═══════════════════════ OOP ════════════════════════════════════════════
  "Classes": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">Classes &amp; Objects — Fundamentals</h4>
        <p>A <strong>class</strong> is a blueprint that defines the state (fields) and behaviour (methods) of objects. An <strong>object</strong> is an instance of that blueprint created at runtime.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>// Declaring a class
public class Dog {
    String name;      // instance field
    int age;

    // Constructor — called when new Dog() is executed
    public Dog(String name, int age) {
        this.name = name;
        this.age  = age;
    }

    public void bark() { System.out.println("Woof!"); }
}

// Creating an object
Dog d = new Dog("Rex", 3);
d.bark();</code></pre>
        <p><strong>Key terms:</strong> <code>new</code> allocates on the heap. <code>this</code> refers to the current object. Every class without an explicit constructor gets a free <em>default no-arg constructor</em>.</p>
        <p><strong>Access modifiers:</strong> <code>public</code> — anywhere; <code>private</code> — same class only; <code>protected</code> — package + subclasses; default (package-private) — same package.</p>
      `,
      docs: [
        { label: "W3Schools — Java Classes", url: "https://www.w3schools.com/java/java_classes.asp" },
        { label: "GeeksforGeeks — Classes & Objects", url: "https://www.geeksforgeeks.org/classes-objects-java/" }
      ],
      videos: [{ label: "Java Classes & Objects Crash Course", url: "https://www.youtube.com/watch?v=WPvGqX-TXP0" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">Classes — Intermediate Patterns</h4>
        <p><strong>Constructor overloading</strong> — a class may have multiple constructors with different parameter lists.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>public class Person {
    private String name;
    private int    age;

    public Person() { this("Unknown", 0); }      // delegates via this()
    public Person(String name) { this(name, 0); }
    public Person(String name, int age) {
        this.name = name; this.age = age;
    }
}</code></pre>
        <p><strong>static members</strong> belong to the <em>class</em>, not to any instance. Static methods cannot reference <code>this</code> or instance fields.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>public class Counter {
    private static int count = 0;
    public Counter() { count++; }
    public static int getCount() { return count; }
}</code></pre>
        <p><strong>Immutable classes</strong>: declare class <code>final</code>, make all fields <code>private final</code>, no setters, deep-copy mutable inputs. E.g. Java's <code>String</code> is immutable.</p>
        <p><strong>equals() / hashCode() contract</strong>: if two objects are equal by equals(), their hashCodes must be equal. Always override both together.</p>
      `,
      docs: [
        { label: "GeeksforGeeks — Constructor Overloading", url: "https://www.geeksforgeeks.org/constructor-overloading-java/" },
        { label: "Oracle — static keyword", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html" }
      ],
      videos: [{ label: "Java Static vs Instance", url: "https://www.youtube.com/watch?v=pMbZkKMgWs8" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">Classes — Advanced &amp; Internals</h4>
        <p><strong>Singleton (thread-safe)</strong> — double-checked locking requires the instance field to be <code>volatile</code> to prevent instruction reordering.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>public class Config {
    private static volatile Config instance;
    private Config() {}
    public static Config getInstance() {
        if (instance == null)
            synchronized (Config.class) {
                if (instance == null) instance = new Config();
            }
        return instance;
    }
}</code></pre>
        <p><strong>Type erasure</strong>: Generics exist only at compile time. At runtime <code>List&lt;String&gt;</code> and <code>List&lt;Integer&gt;</code> are both just <code>List</code>. This is why you cannot do <code>new T()</code> or <code>instanceof List&lt;String&gt;</code>.</p>
        <p><strong>Reflection</strong>: <code>Class.forName("com.example.Foo")</code> → inspect fields, invoke methods, construct objects at runtime. Used heavily by Spring/Hibernate.</p>
        <p><strong>Records (Java 16+)</strong>: <code>record Point(int x, int y) {}</code> auto-generates constructor, getters, equals, hashCode, toString. Fields are implicitly final.</p>
        <p><strong>Sealed classes (Java 17+)</strong>: <code>sealed class Shape permits Circle, Rect {}</code> — restricts which classes may extend/implement.</p>
      `,
      docs: [
        { label: "Oracle — Java Records", url: "https://openjdk.org/jeps/395" },
        { label: "GeeksforGeeks — Singleton Pattern", url: "https://www.geeksforgeeks.org/singleton-class-java/" }
      ],
      videos: [{ label: "Advanced Java OOP Patterns", url: "https://www.youtube.com/watch?v=lDWDuE5pMSo" }]
    }
  },

  "Inheritance": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">Inheritance — Fundamentals</h4>
        <p>Inheritance lets a <strong>subclass</strong> acquire the fields and methods of a <strong>superclass</strong> using the <code>extends</code> keyword.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>class Animal {
    protected String name;
    public void eat() { System.out.println(name + " eats."); }
}

class Dog extends Animal {
    public void bark() { System.out.println("Woof!"); }
}

Dog d = new Dog();
d.name = "Rex";
d.eat();   // inherited
d.bark();  // own method</code></pre>
        <p><code>super</code> keyword accesses parent class members. <code>super()</code> in a constructor calls the parent constructor and must be the first statement.</p>
        <p>Java supports <strong>single inheritance</strong> for classes. Multiple inheritance is achieved through <strong>interfaces</strong>.</p>
      `,
      docs: [{ label: "W3Schools — Java Inheritance", url: "https://www.w3schools.com/java/java_inheritance.asp" }],
      videos: [{ label: "Inheritance Explained", url: "https://www.youtube.com/watch?v=QsicEGHCqH8" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">Inheritance — Intermediate</h4>
        <p><strong>Method Overriding</strong>: A subclass provides its own implementation of a parent method. Use <code>@Override</code> annotation to catch mistakes.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>class Shape {
    public double area() { return 0; }
}
class Circle extends Shape {
    private double r;
    Circle(double r) { this.r = r; }
    @Override
    public double area() { return Math.PI * r * r; }
}</code></pre>
        <p><strong>Method Hiding</strong> (not overriding): when a subclass defines a <code>static</code> method with the same signature as a parent static method, the parent method is <em>hidden</em>, not overridden.</p>
        <p><strong>Abstract classes</strong> can have abstract methods (no body). Cannot instantiate abstract classes directly. Subclasses must implement all abstract methods.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>abstract class Vehicle {
    abstract void start();         // no body
    void stop() { System.out.println("Stopped"); }  // concrete
}</code></pre>
      `,
      docs: [{ label: "GeeksforGeeks — Overriding vs Hiding", url: "https://www.geeksforgeeks.org/difference-between-method-overloading-and-method-overriding-in-java/" }],
      videos: [{ label: "Abstract Classes & Interfaces", url: "https://www.youtube.com/watch?v=HvPlEJ3LHgE" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">Inheritance — Advanced</h4>
        <p><strong>Diamond Problem</strong>: Java forbids multiple class inheritance to avoid ambiguity. Interfaces avoid it because they're contracts. Java 8+ default methods can re-introduce conflict — resolved by explicit override.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>interface A { default void greet() { System.out.println("A"); } }
interface B { default void greet() { System.out.println("B"); } }
class C implements A, B {
    @Override public void greet() { A.super.greet(); } // explicit resolution
}</code></pre>
        <p><strong>Covariant return types</strong>: An overriding method may return a subtype of the parent's return type.</p>
        <p><strong>Constructor chaining across hierarchy</strong>: Every constructor must (explicitly or implicitly) call a parent constructor. The chain always ends at <code>Object()</code>.</p>
        <p><strong>Liskov Substitution Principle (LSP)</strong>: Anywhere a supertype is used, its subtypes must be substitutable without breaking correctness. Violations lead to brittle hierarchies.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Diamond Problem", url: "https://www.geeksforgeeks.org/diamond-problem-java-multiple-inheritance/" }],
      videos: [{ label: "SOLID Principles in Java", url: "https://www.youtube.com/watch?v=rtmFCcjEgEw" }]
    }
  },

  "Polymorphism": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">Polymorphism — Fundamentals</h4>
        <p>Polymorphism means "many forms". Java has two types:</p>
        <ul>
          <li><strong>Compile-time (static)</strong> — method overloading (same name, different params resolved at compile time).</li>
          <li><strong>Runtime (dynamic)</strong> — method overriding resolved at runtime based on the actual object type.</li>
        </ul>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>// Compile-time polymorphism
int add(int a, int b) { return a+b; }
double add(double a, double b) { return a+b; }

// Runtime polymorphism
Animal a = new Dog();  // upcasting
a.sound();  // calls Dog's sound(), resolved at runtime</code></pre>
        <p><strong>Upcasting</strong>: storing a subclass reference in a superclass variable — always safe and implicit.</p>
      `,
      docs: [{ label: "W3Schools — Polymorphism", url: "https://www.w3schools.com/java/java_polymorphism.asp" }],
      videos: [{ label: "Polymorphism Explained", url: "https://www.youtube.com/watch?v=ZaEJeHhOQ0c" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">Polymorphism — Intermediate</h4>
        <p><strong>Dynamic Method Dispatch (virtual dispatch)</strong>: The JVM decides which overridden method to call at runtime by looking up the actual object's class in the vtable.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>Animal[] zoo = { new Dog(), new Cat(), new Bird() };
for (Animal a : zoo) {
    a.sound();  // calls each subclass's sound() — runtime dispatch
}</code></pre>
        <p><strong>Downcasting</strong>: casting a superclass reference back to a subclass. May throw <code>ClassCastException</code> — always guard with <code>instanceof</code>.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>if (a instanceof Dog d) {  // Java 16+ pattern matching
    d.fetch();
}</code></pre>
        <p><strong>Interfaces as polymorphic contracts</strong>: Code to interfaces (<code>List&lt;E&gt;</code>), not implementations (<code>ArrayList</code>). This allows swapping implementations without changing calling code.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Dynamic Dispatch", url: "https://www.geeksforgeeks.org/dynamic-method-dispatch-runtime-polymorphism-java/" }],
      videos: [{ label: "Runtime Polymorphism in Depth", url: "https://www.youtube.com/watch?v=G5uFBCPRaXw" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">Polymorphism — Advanced</h4>
        <p><strong>Parametric polymorphism (Generics)</strong>: Write code that works for any type. Bounded wildcards: <code>&lt;T extends Comparable&lt;T&gt;&gt;</code>.</p>
        <p><strong>Ad-hoc polymorphism</strong>: Method overloading — resolved by the compiler using static types. Note that overloading is NOT polymorphism in the OOP sense (no runtime dispatch).</p>
        <p><strong>Variance</strong>: Covariance (<code>? extends T</code>) allows reading; contravariance (<code>? super T</code>) allows writing. "PECS — Producer Extends, Consumer Super."</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>void printAll(List&lt;? extends Animal&gt; list) {
    for (Animal a : list) System.out.println(a);  // safe read
}
void addDogs(List&lt;? super Dog&gt; list) {
    list.add(new Dog());  // safe write
}</code></pre>
        <p><strong>Visitor pattern</strong>: Achieves double-dispatch (polymorphism on two objects) without native language support.</p>
      `,
      docs: [{ label: "Oracle — Generics Wildcards", url: "https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html" }],
      videos: [{ label: "Java Generics Deep Dive", url: "https://www.youtube.com/watch?v=K1iu1kXkVoA" }]
    }
  },

  "Encapsulation": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">Encapsulation — Fundamentals</h4>
        <p>Encapsulation bundles data (fields) and the code that operates on it (methods) together, while <strong>restricting direct access</strong> to the internals.</p>
        <ul>
          <li>Declare fields <code>private</code>.</li>
          <li>Provide <code>public</code> getter and setter methods.</li>
        </ul>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>public class BankAccount {
    private double balance;  // hidden

    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount &gt; 0) balance += amount;  // validation!
    }
}</code></pre>
        <p><strong>Why?</strong> You can add validation, logging, or change the internal representation without breaking callers.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Encapsulation", url: "https://www.geeksforgeeks.org/encapsulation-in-java/" }],
      videos: [{ label: "Encapsulation in Java", url: "https://www.youtube.com/watch?v=oTzQGkmXJmY" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">Encapsulation — Intermediate</h4>
        <p><strong>Encapsulation vs Abstraction</strong>: Encapsulation is about <em>how</em> you hide implementation (access modifiers). Abstraction is about <em>what</em> you expose (interfaces, abstract classes).</p>
        <p><strong>JavaBeans convention</strong>: A getter for field <code>price</code> is <code>getPrice()</code>; for boolean <code>active</code> it is <code>isActive()</code>. Frameworks (Spring, Hibernate) rely on this convention for auto-wiring.</p>
        <p><strong>Defensive copying</strong>: When a getter returns a mutable object (like a <code>Date</code>), return a copy to prevent callers from mutating the internals.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>public Date getBirthDate() {
    return new Date(birthDate.getTime());  // defensive copy
}</code></pre>
        <p><strong>Package-private (default) access</strong>: No modifier = accessible within the same package. Useful for helper classes that shouldn't be part of the public API.</p>
      `,
      docs: [{ label: "Oracle — Access Control", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html" }],
      videos: [{ label: "Encapsulation vs Abstraction", url: "https://www.youtube.com/watch?v=vZOPCyoiJzg" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">Encapsulation — Advanced</h4>
        <p><strong>Information hiding at the module level (Java 9+ JPMS)</strong>: <code>module-info.java</code> declares which packages are exported. Even public classes in non-exported packages are inaccessible.</p>
        <p><strong>Encapsulation and concurrency</strong>: Mutable state shared across threads must be protected. Encapsulate shared state and use <code>synchronized</code> or <code>java.util.concurrent</code> locks inside your class so callers don't need to think about it.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>public class SafeCounter {
    private int count = 0;
    public synchronized void increment() { count++; }
    public synchronized int get() { return count; }
}</code></pre>
        <p><strong>Immutability as ultimate encapsulation</strong>: An immutable class cannot have its state changed after construction — no need for synchronisation. Prefer immutability (<code>record</code>, <code>final</code> fields) wherever possible.</p>
        <p><strong>Law of Demeter</strong>: A method should only call methods on its own object, objects it created, objects passed in, or its fields. Violation (<code>a.getB().getC().doSomething()</code>) breaks encapsulation across layers.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Java 9 Modules", url: "https://www.geeksforgeeks.org/java-9-module-system/" }],
      videos: [{ label: "Clean Code — Encapsulation Deep Dive", url: "https://www.youtube.com/watch?v=llGgO74uXMI" }]
    }
  },

  // ═══════════════════════ DSA ════════════════════════════════════════════
  "Arrays": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">Arrays — Fundamentals (C++)</h4>
        <p>An array is a fixed-size, contiguous block of memory storing elements of the same type. Access by index is <strong>O(1)</strong>.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>int arr[5] = {10, 20, 30, 40, 50};
cout &lt;&lt; arr[2];   // 30 — O(1) access

// Dynamic array (heap)
int* dyn = new int[10];
delete[] dyn;</code></pre>
        <p><strong>Complexity:</strong> Access O(1) | Search O(n) | Insert/Delete O(n) (shifting required).</p>
        <p><strong>Iteration patterns:</strong> linear scan, two-pointer (opposite ends or same direction), prefix sums.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Arrays in C++", url: "https://www.geeksforgeeks.org/arrays-in-c-cpp/" }],
      videos: [{ label: "Arrays Crash Course", url: "https://www.youtube.com/watch?v=1j9AioE6u3E" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">Arrays — Intermediate (C++)</h4>
        <p><strong>Sorting algorithms on arrays:</strong></p>
        <ul>
          <li>Bubble/Selection/Insertion: O(n²) — good for small/nearly-sorted inputs.</li>
          <li>Merge Sort: O(n log n), stable, O(n) extra space.</li>
          <li>Quick Sort: O(n log n) average, O(n²) worst, in-place.</li>
        </ul>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>// std::sort in C++ — introsort (hybrid quicksort + heapsort)
#include &lt;algorithm&gt;
sort(arr, arr + n);
sort(arr, arr + n, greater&lt;int&gt;());  // descending</code></pre>
        <p><strong>Two-pointer technique:</strong> Used in sorted arrays for pair-sum, container with most water, etc.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>// Find pair with target sum in sorted array
int l = 0, r = n - 1;
while (l &lt; r) {
    int sum = arr[l] + arr[r];
    if (sum == target) { /* found */ break; }
    else if (sum &lt; target) l++;
    else r--;
}</code></pre>
      `,
      docs: [{ label: "CP-Algorithms — Two Pointers", url: "https://cp-algorithms.com/two_pointers/two_pointers.html" }],
      videos: [{ label: "Two Pointer Technique", url: "https://www.youtube.com/watch?v=GsfjR_TN8EE" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">Arrays — Advanced (C++)</h4>
        <p><strong>Kadane's Algorithm</strong> — Maximum Subarray Sum in O(n):</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>int maxSubarraySum(vector&lt;int&gt;&amp; a) {
    int maxSoFar = a[0], cur = a[0];
    for (int i = 1; i &lt; a.size(); i++) {
        cur = max(a[i], cur + a[i]);
        maxSoFar = max(maxSoFar, cur);
    }
    return maxSoFar;
}</code></pre>
        <p><strong>Prefix sums</strong>: precompute <code>pre[i] = a[0]+...+a[i]</code> for O(1) range sum queries.</p>
        <p><strong>Dutch National Flag (3-way partition)</strong>: sort array of 0s, 1s, 2s in O(n) with O(1) space — classic interview question.</p>
        <p><strong>Sliding window</strong>: maintain a window [l,r] expanding/contracting to find subarray satisfying a condition in O(n). Used for "max sum of k elements", "longest subarray with sum ≤ k".</p>
        <p><strong>Monotonic stack on arrays</strong>: Next Greater Element, Stock Span Problem — O(n) using a stack to avoid O(n²) brute force.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Kadane's Algorithm", url: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/" }],
      videos: [{ label: "Sliding Window Technique", url: "https://www.youtube.com/watch?v=MK-NZ4hN7rs" }]
    }
  },

  "Linked List": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">Linked List — Fundamentals (C++)</h4>
        <p>A linked list stores elements in nodes scattered in memory, linked by pointers. No random access — traversal is O(n).</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};
// Singly linked list — each node points to the next
// Doubly linked list — each node has prev and next pointers</code></pre>
        <p><strong>Complexity:</strong> Access O(n) | Insert at head O(1) | Insert/Delete at arbitrary position O(n) to find + O(1) to link.</p>
        <p><strong>Types:</strong> Singly, Doubly, Circular Singly, Circular Doubly.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Linked List", url: "https://www.geeksforgeeks.org/data-structures/linked-list/" }],
      videos: [{ label: "Linked Lists Introduction", url: "https://www.youtube.com/watch?v=njTh_OwMmlA" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">Linked List — Intermediate (C++)</h4>
        <p><strong>Iterative reversal</strong> — O(n) time, O(1) space:</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>Node* reverse(Node* head) {
    Node *prev = nullptr, *cur = head, *nxt;
    while (cur) {
        nxt = cur-&gt;next;
        cur-&gt;next = prev;
        prev = cur; cur = nxt;
    }
    return prev;  // new head
}</code></pre>
        <p><strong>Floyd's Cycle Detection (Tortoise &amp; Hare)</strong>: slow moves 1 step, fast moves 2 steps. If they meet → cycle exists. O(n) time, O(1) space.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>bool hasCycle(Node* head) {
    Node *s = head, *f = head;
    while (f &amp;&amp; f-&gt;next) {
        s = s-&gt;next; f = f-&gt;next-&gt;next;
        if (s == f) return true;
    }
    return false;
}</code></pre>
      `,
      docs: [{ label: "GeeksforGeeks — Floyd's Cycle", url: "https://www.geeksforgeeks.org/floyds-cycle-finding-algorithm/" }],
      videos: [{ label: "Linked List Interview Problems", url: "https://www.youtube.com/watch?v=WsNQuCa_-PU" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">Linked List — Advanced (C++)</h4>
        <p><strong>Finding the start of a cycle</strong>: After Floyd's detection, reset one pointer to head. Move both one step at a time — they meet at the cycle start.</p>
        <p><strong>Merge K sorted lists</strong> — O(n log k) using a min-heap (priority_queue). Each heap operation is O(log k).</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>// LRU Cache using doubly linked list + hash map
// O(1) get and put:
// HashMap stores key → Node*
// DLL maintains access order (most-recent at front)</code></pre>
        <p><strong>Skip List</strong>: Probabilistic data structure with O(log n) average search, insert, delete — an ordered alternative to balanced BSTs.</p>
        <p><strong>XOR Linked List</strong>: Each node stores <code>prev XOR next</code> — saves one pointer per node. Traversal requires the previous address.</p>
      `,
      docs: [{ label: "GeeksforGeeks — LRU Cache", url: "https://www.geeksforgeeks.org/lru-cache-implementation/" }],
      videos: [{ label: "Hard Linked List Problems", url: "https://www.youtube.com/watch?v=S5bfdUTrKLM" }]
    }
  },

  "Stack": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">Stack — Fundamentals (C++)</h4>
        <p>A stack is a LIFO (Last In, First Out) linear data structure. Three core operations: <strong>push</strong> (add), <strong>pop</strong> (remove top), <strong>peek/top</strong> (read top).</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>#include &lt;stack&gt;
stack&lt;int&gt; st;
st.push(10); st.push(20); st.push(30);
cout &lt;&lt; st.top();  // 30
st.pop();
cout &lt;&lt; st.top();  // 20</code></pre>
        <p><strong>Applications:</strong> function call stack, undo/redo, expression evaluation, balanced parentheses checking, backtracking (DFS).</p>
        <p><strong>Complexity:</strong> All operations O(1).</p>
      `,
      docs: [{ label: "GeeksforGeeks — Stack", url: "https://www.geeksforgeeks.org/stack-data-structure/" }],
      videos: [{ label: "Stack Data Structure", url: "https://www.youtube.com/watch?v=F1F2imiAOj8" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">Stack — Intermediate (C++)</h4>
        <p><strong>Balanced parentheses</strong>: Push opening brackets; on closing bracket, check stack top for match. O(n).</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>bool isBalanced(string s) {
    stack&lt;char&gt; st;
    for (char c : s) {
        if (c=='(' || c=='[' || c=='{') st.push(c);
        else {
            if (st.empty()) return false;
            char t = st.top(); st.pop();
            if ((c==')' &amp;&amp; t!='(') || (c==']' &amp;&amp; t!='[') || (c=='}' &amp;&amp; t!='{'))
                return false;
        }
    }
    return st.empty();
}</code></pre>
        <p><strong>Infix → Postfix (Shunting-Yard)</strong>: Use an operator stack. Higher precedence operators are applied before lower ones.</p>
        <p><strong>Min Stack</strong>: Maintain a second stack tracking the current minimum. Push to min-stack when new element ≤ current min. O(1) getMin().</p>
      `,
      docs: [{ label: "GeeksforGeeks — Infix to Postfix", url: "https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/" }],
      videos: [{ label: "Stack Problems Explained", url: "https://www.youtube.com/watch?v=GYptUgnIM_I" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">Stack — Advanced (C++)</h4>
        <p><strong>Monotonic Stack</strong>: Maintain elements in monotonically increasing or decreasing order. Used for Next Greater Element, Largest Rectangle in Histogram.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>// Next Greater Element — O(n)
vector&lt;int&gt; nextGreater(vector&lt;int&gt;&amp; a) {
    int n = a.size();
    vector&lt;int&gt; res(n, -1);
    stack&lt;int&gt; st;  // stores indices
    for (int i = 0; i &lt; n; i++) {
        while (!st.empty() &amp;&amp; a[st.top()] &lt; a[i]) {
            res[st.top()] = a[i]; st.pop();
        }
        st.push(i);
    }
    return res;
}</code></pre>
        <p><strong>Largest Rectangle in Histogram</strong>: O(n) using monotonic stack — classic hard interview problem.</p>
        <p><strong>Trapping Rain Water</strong>: Can be solved O(n) with a stack or O(n) with two-pointer.</p>
        <p><strong>Celebrity Problem</strong>: Find a person known by all but knowing none — O(n) using a stack of candidates.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Monotonic Stack", url: "https://www.geeksforgeeks.org/next-greater-element/" }],
      videos: [{ label: "Monotonic Stack Patterns", url: "https://www.youtube.com/watch?v=Dq_ObZwTY_Q" }]
    }
  },

  "Queue": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">Queue — Fundamentals (C++)</h4>
        <p>A queue is a FIFO (First In, First Out) structure. Elements enter at the <strong>rear</strong> and leave from the <strong>front</strong>.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>#include &lt;queue&gt;
queue&lt;int&gt; q;
q.push(10); q.push(20); q.push(30);
cout &lt;&lt; q.front(); // 10
q.pop();
cout &lt;&lt; q.front(); // 20</code></pre>
        <p><strong>Applications:</strong> BFS traversal, CPU scheduling, print spooling, web server request handling.</p>
        <p><strong>Types:</strong> Simple, Circular, Priority, Deque (Double-ended).</p>
      `,
      docs: [{ label: "GeeksforGeeks — Queue", url: "https://www.geeksforgeeks.org/queue-data-structure/" }],
      videos: [{ label: "Queue Data Structure", url: "https://www.youtube.com/watch?v=wjI1WNcIntg" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">Queue — Intermediate (C++)</h4>
        <p><strong>Circular Queue</strong>: Rear wraps around to the front, reusing freed slots. Fixed-size, O(1) enqueue/dequeue without shifting.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>// rear = (rear + 1) % capacity;</code></pre>
        <p><strong>Priority Queue (Heap-backed)</strong>: Max-heap by default in C++. Extract max in O(log n). Useful for Dijkstra, scheduling, top-K problems.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>priority_queue&lt;int&gt; maxpq;              // max-heap
priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; minpq; // min-heap
maxpq.push(5); maxpq.push(1); maxpq.push(9);
cout &lt;&lt; maxpq.top(); // 9</code></pre>
        <p><strong>Deque</strong>: <code>std::deque</code> supports O(1) push/pop at both ends. Used for sliding window maximum problem.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Priority Queue", url: "https://www.geeksforgeeks.org/priority-queue-in-cpp-stl/" }],
      videos: [{ label: "Priority Queue Explained", url: "https://www.youtube.com/watch?v=HCEr35qpawQ" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">Queue — Advanced (C++)</h4>
        <p><strong>Sliding Window Maximum (monotonic deque)</strong>: O(n) — deque stores indices, front is always the current max. Elements that can never be the max are discarded from the back.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>vector&lt;int&gt; maxSlidingWindow(vector&lt;int&gt;&amp; a, int k) {
    deque&lt;int&gt; dq; vector&lt;int&gt; res;
    for (int i = 0; i &lt; a.size(); i++) {
        if (!dq.empty() &amp;&amp; dq.front() &lt;= i-k) dq.pop_front();
        while (!dq.empty() &amp;&amp; a[dq.back()] &lt;= a[i]) dq.pop_back();
        dq.push_back(i);
        if (i &gt;= k-1) res.push_back(a[dq.front()]);
    }
    return res;
}</code></pre>
        <p><strong>BFS on multi-source / 0-1 BFS</strong>: 0-1 BFS uses a deque — push front for weight-0 edges, push back for weight-1 edges. O(V+E).</p>
        <p><strong>Double-ended Priority Queue</strong>: Supports both min and max extraction efficiently (interval heaps or two heaps + lazy deletion).</p>
      `,
      docs: [{ label: "GeeksforGeeks — Sliding Window Max", url: "https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/" }],
      videos: [{ label: "Monotonic Deque Pattern", url: "https://www.youtube.com/watch?v=DfljaUwZsOk" }]
    }
  },

  "Tree": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">Trees — Fundamentals (C++)</h4>
        <p>A tree is a hierarchical, non-linear data structure. A <strong>Binary Tree</strong> has at most 2 children per node.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>struct Node { int val; Node *left, *right; Node(int v):val(v),left(nullptr),right(nullptr){} };

// Three traversals:
void inorder(Node* n)  { if(!n) return; inorder(n->left); cout<<n->val<<" "; inorder(n->right); }   // L Root R
void preorder(Node* n) { if(!n) return; cout<<n->val<<" "; preorder(n->left); preorder(n->right); }  // Root L R
void postorder(Node* n){ if(!n) return; postorder(n->left); postorder(n->right); cout<<n->val<<" ";} // L R Root</code></pre>
        <p><strong>BST property:</strong> left subtree &lt; node &lt; right subtree. In-order traversal of BST gives sorted output.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Binary Tree", url: "https://www.geeksforgeeks.org/binary-tree-data-structure/" }],
      videos: [{ label: "Trees Data Structure", url: "https://www.youtube.com/watch?v=oSWTXtMglKE" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">Trees — Intermediate (C++)</h4>
        <p><strong>AVL Tree</strong>: Self-balancing BST. Balance factor = height(left) − height(right) ∈ {−1, 0, 1}. Four rotations: LL, RR, LR, RL.</p>
        <p><strong>Level-order (BFS) traversal</strong> uses a queue:</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>void levelOrder(Node* root) {
    queue&lt;Node*&gt; q; q.push(root);
    while (!q.empty()) {
        Node* n = q.front(); q.pop();
        cout &lt;&lt; n-&gt;val &lt;&lt; " ";
        if (n-&gt;left) q.push(n-&gt;left);
        if (n-&gt;right) q.push(n-&gt;right);
    }
}</code></pre>
        <p><strong>Heap</strong>: A complete binary tree satisfying the heap property. Max-heap: parent ≥ children. Implemented efficiently as an array: children of index i at 2i+1 and 2i+2.</p>
        <p><strong>Segment Tree</strong>: Range query + point update in O(log n). Built in O(n).</p>
      `,
      docs: [{ label: "GeeksforGeeks — AVL Tree", url: "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/" }],
      videos: [{ label: "AVL Trees Explained", url: "https://www.youtube.com/watch?v=jDM6_TnYIqE" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">Trees — Advanced (C++)</h4>
        <p><strong>Red-Black Tree</strong>: BST with color (R/G) per node. Guarantees height ≤ 2 log(n+1). Used in STL <code>map</code> / <code>set</code>.</p>
        <p><strong>Lowest Common Ancestor (LCA)</strong>: Binary Lifting pre-processes in O(n log n), each query O(log n). Euler tour + sparse table gives O(1) per query.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>// Morris Traversal: In-order without recursion or stack — O(n) time, O(1) space
// Uses threaded binary tree: temporarily links right pointer to in-order successor</code></pre>
        <p><strong>Fenwick Tree (BIT)</strong>: Prefix sum queries + point updates in O(log n) with O(n) space. Simpler than segment tree for this specific use-case.</p>
        <p><strong>Treap</strong>: BST + heap (each node has random priority). Randomised BST with O(log n) expected operations. Supports split and merge.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Fenwick Tree", url: "https://www.geeksforgeeks.org/binary-indexed-tree-or-fenwick-tree-2/" }],
      videos: [{ label: "LCA and Advanced Trees", url: "https://www.youtube.com/watch?v=dOAxrhAUIhA" }]
    }
  },

  "Graph": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">Graphs — Fundamentals (C++)</h4>
        <p>A graph G = (V, E) has vertices and edges. Edges can be directed or undirected, weighted or unweighted.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>// Adjacency list representation
vector&lt;vector&lt;int&gt;&gt; adj(V);
adj[u].push_back(v);  // edge u→v

// BFS — uses queue — O(V+E)
void bfs(int src) {
    vector&lt;bool&gt; vis(V, false);
    queue&lt;int&gt; q; q.push(src); vis[src]=true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) if (!vis[v]) { vis[v]=true; q.push(v); }
    }
}</code></pre>
        <p><strong>DFS</strong> uses a stack (or recursion). BFS finds shortest path in unweighted graphs.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Graph DS", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" }],
      videos: [{ label: "Graph Theory Introduction", url: "https://www.youtube.com/watch?v=DBRW8nwZVks" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">Graphs — Intermediate (C++)</h4>
        <p><strong>Dijkstra's Algorithm</strong> — Single source shortest path for non-negative weights. O((V+E) log V) with a priority queue.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>// Min-heap: {dist, node}
priority_queue&lt;pair&lt;int,int&gt;, vector&lt;pair&lt;int,int&gt;&gt;, greater&lt;&gt;&gt; pq;
vector&lt;int&gt; dist(V, INT_MAX);
dist[src]=0; pq.push({0,src});
while (!pq.empty()) {
    auto [d,u] = pq.top(); pq.pop();
    if (d &gt; dist[u]) continue;
    for (auto [v,w] : adj[u])
        if (dist[u]+w &lt; dist[v]) { dist[v]=dist[u]+w; pq.push({dist[v],v}); }
}</code></pre>
        <p><strong>Topological Sort</strong>: Valid only on DAGs. Kahn's algorithm (BFS on in-degrees) or DFS-based. Used for dependency resolution, build systems.</p>
        <p><strong>Cycle detection</strong>: In undirected graphs use DFS + parent tracking. In directed graphs use DFS + recursion-stack (gray-white-black coloring).</p>
      `,
      docs: [{ label: "GeeksforGeeks — Dijkstra", url: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/" }],
      videos: [{ label: "Dijkstra's Algorithm", url: "https://www.youtube.com/watch?v=GazC3A4OQTE" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">Graphs — Advanced (C++)</h4>
        <p><strong>Bellman-Ford</strong>: Handles negative weights, detects negative cycles. O(VE). Relax all edges V−1 times.</p>
        <p><strong>Floyd-Warshall</strong>: All-pairs shortest paths. O(V³). DP: <code>dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j])</code> for each intermediate k.</p>
        <p><strong>MST (Minimum Spanning Tree):</strong></p>
        <ul>
          <li><strong>Kruskal's</strong>: Sort edges by weight, add greedily using Union-Find. O(E log E).</li>
          <li><strong>Prim's</strong>: Grow MST from a start vertex using a priority queue. O(E log V).</li>
        </ul>
        <p><strong>Strongly Connected Components (SCC)</strong>: Tarjan's algorithm or Kosaraju's (two DFS passes) — O(V+E). Used in compiler dependency analysis.</p>
        <p><strong>Network Flow (Max-Flow)</strong>: Ford-Fulkerson / Edmonds-Karp (BFS-based augmenting paths). Used for bipartite matching, image segmentation.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Kruskal MST", url: "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/" }],
      videos: [{ label: "Graph Algorithms Masterclass", url: "https://www.youtube.com/watch?v=09_LlHjoEiY" }]
    }
  },

  // ═══════════════════════ OPERATING SYSTEM ════════════════════════════════
  "Bash Script": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">Bash Scripting — Fundamentals</h4>
        <p>Bash (Bourne Again SHell) is the default shell on most Linux distributions. Scripts automate command-line tasks.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>#!/bin/bash          # shebang — specifies the interpreter
# Comments start with #

NAME="Cyber"
echo "Hello, $NAME!"

# Read input
read -p "Enter your name: " USER
echo "Welcome, $USER"</code></pre>
        <p><strong>Variables:</strong> no spaces around <code>=</code>. Access with <code>$VAR</code>. <strong>Command substitution:</strong> <code>$(command)</code> captures output into a variable.</p>
        <p><strong>Exit codes:</strong> 0 = success; non-zero = error. Check last exit code with <code>$?</code>.</p>
      `,
      docs: [{ label: "Bash Scripting Tutorial", url: "https://www.geeksforgeeks.org/bash-scripting-tutorial/" }],
      videos: [{ label: "Bash Scripting Full Course", url: "https://www.youtube.com/watch?v=e7BufAVwDiM" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">Bash Scripting — Intermediate</h4>
        <p><strong>Conditionals and loops:</strong></p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>#!/bin/bash
NUM=7
if [ $NUM -gt 5 ]; then
    echo "Greater"
elif [ $NUM -eq 5 ]; then
    echo "Equal"
else
    echo "Smaller"
fi

# For loop
for i in {1..5}; do echo "Iteration $i"; done

# While loop
COUNT=0
while [ $COUNT -lt 3 ]; do
    echo $COUNT; ((COUNT++))
done</code></pre>
        <p><strong>Comparison operators:</strong> <code>-eq -ne -lt -le -gt -ge</code> for integers; <code>= != &lt; &gt;</code> for strings inside <code>[[ ]]</code>.</p>
        <p><strong>Functions:</strong> <code>my_func() { ... }</code>. Arguments accessed as <code>$1 $2 ... $@</code>.</p>
      `,
      docs: [{ label: "Bash Conditionals Guide", url: "https://www.geeksforgeeks.org/conditional-statements-shell-script/" }],
      videos: [{ label: "Bash Loops and Functions", url: "https://www.youtube.com/watch?v=v-F3YLd6oMw" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">Bash Scripting — Advanced</h4>
        <p><strong>Error handling with set:</strong></p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>set -euo pipefail  # exit on error, unset var = error, pipe failure matters
trap 'echo "Error on line $LINENO"' ERR</code></pre>
        <p><strong>Arrays:</strong></p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>FRUITS=("apple" "banana" "cherry")
echo ${FRUITS[1]}        # banana
echo ${#FRUITS[@]}       # array length
for f in "${FRUITS[@]}"; do echo $f; done</code></pre>
        <p><strong>Regular expressions with sed/awk:</strong></p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>sed 's/foo/bar/g' file.txt          # replace all foo with bar
awk '{sum += $2} END {print sum}' data.txt  # sum column 2
grep -E '^[0-9]+$' file.txt         # extended regex</code></pre>
        <p><strong>Process substitution:</strong> <code>diff &lt;(sort file1) &lt;(sort file2)</code> — treats command output as a file.</p>
      `,
      docs: [{ label: "Advanced Bash Scripting Guide", url: "https://tldp.org/LDP/abs/html/" }],
      videos: [{ label: "Advanced Bash Techniques", url: "https://www.youtube.com/watch?v=emhouufDnB4" }]
    }
  },

  "Process": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">OS Process Management — Fundamentals</h4>
        <p>A <strong>process</strong> is a program in execution. It has its own memory space: code, data, heap, and stack segments.</p>
        <p><strong>Process states:</strong> New → Ready → Running → Waiting/Blocked → Terminated.</p>
        <p>The OS maintains a <strong>PCB (Process Control Block)</strong> for each process: PID, state, program counter, registers, memory info, open files.</p>
        <p><strong>fork()</strong> system call creates a child process — an exact copy of the parent. Returns 0 to child, child's PID to parent, -1 on error.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>pid_t pid = fork();
if (pid == 0)      cout &lt;&lt; "Child";
else if (pid &gt; 0)  cout &lt;&lt; "Parent";
else               cerr &lt;&lt; "Fork failed";</code></pre>
      `,
      docs: [{ label: "GeeksforGeeks — Process Management", url: "https://www.geeksforgeeks.org/introduction-of-process-management/" }],
      videos: [{ label: "Process Management in OS", url: "https://www.youtube.com/watch?v=OrM7nZcxXZU" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">OS Process Management — Intermediate</h4>
        <p><strong>CPU Scheduling algorithms:</strong></p>
        <ul>
          <li><strong>FCFS</strong> — First Come First Served: simple, convoy effect.</li>
          <li><strong>SJF</strong> — Shortest Job First: optimal average waiting time, requires future knowledge.</li>
          <li><strong>Round Robin</strong>: time quantum; good response time for interactive systems.</li>
          <li><strong>Priority Scheduling</strong>: can cause starvation — solved by aging.</li>
        </ul>
        <p><strong>Context Switch:</strong> OS saves the current process's state (PCB) and loads the next process's state. Pure overhead — no useful work done during switch.</p>
        <p><strong>Zombie Process:</strong> Completed execution but PCB still in process table because parent hasn't called <code>wait()</code>. Resolved by parent calling <code>wait()</code> or <code>waitpid()</code>.</p>
        <p><strong>Orphan Process:</strong> Parent terminates before child. Child is adopted by <code>init</code> (PID 1).</p>
      `,
      docs: [{ label: "GeeksforGeeks — CPU Scheduling", url: "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/" }],
      videos: [{ label: "CPU Scheduling Algorithms", url: "https://www.youtube.com/watch?v=EWkQl0n0w5M" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">OS Process Management — Advanced</h4>
        <p><strong>Inter-Process Communication (IPC):</strong> Pipes, Named Pipes (FIFOs), Message Queues, Shared Memory, Sockets. Shared memory is fastest (no kernel involvement after setup).</p>
        <p><strong>exec() family:</strong> Replaces the current process image with a new program. <code>execve(path, argv, envp)</code> — used after <code>fork()</code> to run a different program.</p>
        <p><strong>Copy-on-Write (CoW):</strong> After <code>fork()</code>, parent and child share pages marked read-only. A page is copied only when either process writes to it — saves memory.</p>
        <p><strong>Process Groups &amp; Sessions:</strong> Processes in the same group share a PGID. A session is a collection of process groups. Useful for signal broadcasting and terminal management.</p>
        <p><strong>Signals:</strong> Asynchronous notifications. <code>SIGKILL (9)</code> cannot be caught or ignored. <code>SIGTERM (15)</code> can be handled for graceful shutdown.</p>
      `,
      docs: [{ label: "GeeksforGeeks — IPC", url: "https://www.geeksforgeeks.org/inter-process-communication-ipc/" }],
      videos: [{ label: "IPC and Advanced Process Concepts", url: "https://www.youtube.com/watch?v=e60ItwlZTKcQ" }]
    }
  },

  "Thread": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">OS Threads — Fundamentals</h4>
        <p>A thread is the smallest unit of execution within a process. Threads within the same process share: code, data, heap, and open file descriptors. Each thread has its own: stack, registers, and program counter.</p>
        <p><strong>Thread vs Process:</strong> Creating a thread is cheaper (shared address space). Communication is easier but bugs are harder — shared state needs synchronization.</p>
        <p><strong>Race condition:</strong> Two threads read and write a shared variable without synchronisation — result depends on scheduling order.</p>
        <p><strong>Mutex (Mutual Exclusion Lock):</strong> Only one thread holds the lock at a time. Other threads block until it is released.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Threads in OS", url: "https://www.geeksforgeeks.org/thread-in-operating-system/" }],
      videos: [{ label: "Threads and Concurrency", url: "https://www.youtube.com/watch?v=LOfGJcVnvAk" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">OS Threads — Intermediate</h4>
        <p><strong>Synchronization primitives:</strong></p>
        <ul>
          <li><strong>Mutex</strong>: binary lock (locked/unlocked).</li>
          <li><strong>Semaphore</strong>: integer counter. <code>wait()</code> (P) decrements; <code>signal()</code> (V) increments. A semaphore with value 1 acts as a mutex.</li>
          <li><strong>Monitor</strong>: high-level synchronization (Java's <code>synchronized</code> methods).</li>
        </ul>
        <p><strong>Deadlock — four Coffman conditions:</strong> Mutual Exclusion, Hold &amp; Wait, No Preemption, Circular Wait. <em>All four</em> must be present for deadlock. Breaking any one prevents it.</p>
        <p><strong>Deadlock prevention vs avoidance vs detection:</strong></p>
        <ul>
          <li>Prevention: eliminate a Coffman condition by design.</li>
          <li>Avoidance: Banker's Algorithm — only grant resources if result is safe state.</li>
          <li>Detection: allow deadlock, detect via wait-for graph, recover by aborting processes.</li>
        </ul>
      `,
      docs: [{ label: "GeeksforGeeks — Deadlock", url: "https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/" }],
      videos: [{ label: "Deadlock Explained", url: "https://www.youtube.com/watch?v=UVo9mGARkhQ" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">OS Threads — Advanced</h4>
        <p><strong>Lock-free programming:</strong> Use atomic compare-and-swap (CAS) operations. No mutexes, no blocking. Risk: ABA problem — use versioned pointers or hazard pointers.</p>
        <p><strong>Memory consistency models:</strong></p>
        <ul>
          <li><strong>Sequential Consistency:</strong> Strictest — all threads see the same global order of operations.</li>
          <li><strong>Release/Acquire:</strong> Weaker — ensures synchronization edges. Used by C++11 <code>memory_order_acquire/release</code>.</li>
          <li><strong>Relaxed:</strong> Weakest — compiler/CPU can reorder freely.</li>
        </ul>
        <p><strong>Priority Inversion:</strong> A high-priority thread waits for a resource held by a low-priority thread, which is preempted by a medium-priority thread. Solution: <em>priority inheritance</em> — temporarily boost the lock-holder's priority.</p>
        <p><strong>Thread pools:</strong> Pre-create N threads, submit tasks to a queue. Avoids thread creation overhead per task. Used in Java's <code>ExecutorService</code>, C++'s <code>std::thread</code> pool.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Priority Inversion", url: "https://www.geeksforgeeks.org/priority-inversion-what-the-heck/" }],
      videos: [{ label: "Lock-Free Programming", url: "https://www.youtube.com/watch?v=ZQFzMfHIxng" }]
    }
  },

  "Memory Management": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">OS Memory Management — Fundamentals</h4>
        <p>The OS manages physical (RAM) memory and presents each process a virtual address space.</p>
        <p><strong>Paging:</strong> Divides physical memory into fixed-size <em>frames</em> and virtual memory into same-size <em>pages</em>. A <em>page table</em> maps virtual page → physical frame. Eliminates external fragmentation.</p>
        <p><strong>Segmentation:</strong> Divides memory into variable-size segments (code, data, stack). Preserves logical structure but causes external fragmentation.</p>
        <p><strong>Internal vs External fragmentation:</strong></p>
        <ul>
          <li><strong>Internal:</strong> Allocated block larger than needed — space wasted inside the block (paging problem).</li>
          <li><strong>External:</strong> Free space exists but is scattered — no contiguous block large enough (segmentation problem).</li>
        </ul>
      `,
      docs: [{ label: "GeeksforGeeks — Memory Management", url: "https://www.geeksforgeeks.org/memory-management-in-operating-system/" }],
      videos: [{ label: "OS Memory Management", url: "https://www.youtube.com/watch?v=qcBIvnQOOwk" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">OS Memory Management — Intermediate</h4>
        <p><strong>Virtual Memory:</strong> Allows process address spaces larger than physical RAM. Pages not in RAM are stored on disk (swap space). A <em>page fault</em> triggers loading the missing page.</p>
        <p><strong>Page Replacement Algorithms:</strong></p>
        <ul>
          <li><strong>OPT (Belady's):</strong> Replace the page not used longest in the future. Theoretical optimum — impossible in practice.</li>
          <li><strong>FIFO:</strong> Simple; suffers Belady's anomaly — more frames can cause more page faults.</li>
          <li><strong>LRU (Least Recently Used):</strong> Replace the least recently accessed. Approximates OPT. Implemented with a doubly-linked list + hashmap for O(1).</li>
          <li><strong>Clock (Second Chance):</strong> Approximates LRU efficiently with a reference bit.</li>
        </ul>
        <p><strong>TLB (Translation Lookaside Buffer):</strong> Hardware cache for the page table. Hit → O(1) address translation; Miss → full page table walk.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Page Replacement", url: "https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/" }],
      videos: [{ label: "Virtual Memory Explained", url: "https://www.youtube.com/watch?v=A9WLYbE0p-I" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">OS Memory Management — Advanced</h4>
        <p><strong>Thrashing:</strong> OS spends more time swapping pages than executing process instructions. CPU utilisation plummets. Caused by having too many processes competing for frames. Solution: Working Set Model — keep each process's working set in memory; suspend processes if not enough frames.</p>
        <p><strong>Huge Pages / THP:</strong> 2MB or 1GB pages instead of 4KB — reduces TLB misses for large memory apps (databases, JVMs). Trade-off: more internal fragmentation.</p>
        <p><strong>Memory-mapped files (mmap):</strong> Maps a file's contents into virtual address space. Read/write file data via pointers — faster than read()/write() system calls. Used by loaders, databases, and shared libraries.</p>
        <p><strong>NUMA (Non-Uniform Memory Access):</strong> In multi-socket systems, accessing local memory node is faster than remote. OS schedulers and memory allocators must be NUMA-aware for peak performance.</p>
        <p><strong>Copy-on-Write (CoW) in VM:</strong> Multiple processes share the same physical page read-only. A write triggers a copy of that page — avoids eager duplication at fork().</p>
      `,
      docs: [{ label: "GeeksforGeeks — Thrashing", url: "https://www.geeksforgeeks.org/techniques-to-handle-thrashing/" }],
      videos: [{ label: "Advanced Memory Management", url: "https://www.youtube.com/watch?v=qdkxXygc3rE" }]
    }
  },

  // ═══════════════════════ DBMS ════════════════════════════════════════════
  "SQL Basics": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">SQL Basics — Fundamentals</h4>
        <p>SQL (Structured Query Language) is used to interact with relational databases. Core CRUD operations:</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>-- SELECT (Read)
SELECT name, age FROM Users WHERE age >= 18;

-- INSERT (Create)
INSERT INTO Users (name, age) VALUES ('Neo', 25);

-- UPDATE
UPDATE Users SET age = 26 WHERE name = 'Neo';

-- DELETE
DELETE FROM Users WHERE age < 18;</code></pre>
        <p><strong>Filtering:</strong> <code>WHERE</code> filters rows. <code>ORDER BY col ASC|DESC</code> sorts. <code>LIMIT n</code> restricts result count.</p>
        <p><strong>JOINs:</strong> INNER JOIN — matching rows only. LEFT JOIN — all left rows + matching right. RIGHT JOIN — vice versa. FULL OUTER JOIN — all rows.</p>
      `,
      docs: [{ label: "W3Schools — SQL Tutorial", url: "https://www.w3schools.com/sql/" }],
      videos: [{ label: "SQL Basics for Beginners", url: "https://www.youtube.com/watch?v=zsjvFFKOm3c" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">SQL Basics — Intermediate</h4>
        <p><strong>Aggregate functions:</strong> <code>COUNT(), SUM(), AVG(), MAX(), MIN()</code>. Used with <code>GROUP BY</code> to aggregate per group.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>SELECT dept, COUNT(*) AS headcount, AVG(salary) AS avg_sal
FROM Employees
GROUP BY dept
HAVING AVG(salary) > 50000;  -- filters GROUPS (not rows)</code></pre>
        <p><strong>WHERE vs HAVING:</strong> WHERE filters rows before grouping; HAVING filters groups after aggregation.</p>
        <p><strong>Subqueries:</strong> A query nested inside another. Can appear in SELECT, FROM, or WHERE clauses.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>SELECT name FROM Employees
WHERE salary > (SELECT AVG(salary) FROM Employees);</code></pre>
        <p><strong>DISTINCT:</strong> <code>SELECT DISTINCT city FROM Customers</code> — removes duplicate rows.</p>
      `,
      docs: [{ label: "W3Schools — GROUP BY", url: "https://www.w3schools.com/sql/sql_groupby.asp" }],
      videos: [{ label: "SQL Intermediate Queries", url: "https://www.youtube.com/watch?v=p3qvj9hO_Bo" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">SQL Basics — Advanced</h4>
        <p><strong>Window Functions:</strong> Compute aggregates over a window of rows without collapsing them.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>SELECT name, salary,
    RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank,
    SUM(salary) OVER (PARTITION BY dept) AS dept_total
FROM Employees;</code></pre>
        <p><strong>CTEs (Common Table Expressions):</strong></p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>WITH HighEarners AS (
    SELECT * FROM Employees WHERE salary > 80000
)
SELECT dept, COUNT(*) FROM HighEarners GROUP BY dept;</code></pre>
        <p><strong>Recursive CTEs:</strong> For hierarchical data (org charts, bill-of-materials).</p>
        <p><strong>EXPLAIN / EXPLAIN ANALYZE:</strong> Shows the query execution plan. Look for full table scans (Seq Scan) vs index scans. Use to guide index creation.</p>
        <p><strong>LATERAL JOIN:</strong> Allows a subquery in the FROM clause to reference columns from preceding FROM items.</p>
      `,
      docs: [{ label: "PostgreSQL — Window Functions", url: "https://www.postgresql.org/docs/current/tutorial-window.html" }],
      videos: [{ label: "SQL Window Functions", url: "https://www.youtube.com/watch?v=H6OTMoXjNiY" }]
    }
  },

  "Normalization": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">DBMS Normalization — Fundamentals</h4>
        <p>Normalization organizes data to reduce <strong>redundancy</strong> and avoid <strong>anomalies</strong> (insert, update, delete anomalies).</p>
        <ul>
          <li><strong>1NF:</strong> Each column is atomic (indivisible); each row is unique (has a primary key).</li>
          <li><strong>2NF:</strong> 1NF + no <em>partial dependencies</em> — every non-key attribute depends on the <em>whole</em> primary key (matters for composite keys).</li>
          <li><strong>3NF:</strong> 2NF + no <em>transitive dependencies</em> — non-key attributes depend only on the primary key, not on other non-key attributes.</li>
        </ul>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>-- Transitive dependency violation (3NF):
-- Orders(order_id, customer_id, customer_city)
-- customer_city depends on customer_id, not order_id
-- Fix: move customer_city to a Customers table</code></pre>
      `,
      docs: [{ label: "GeeksforGeeks — Normalization", url: "https://www.geeksforgeeks.org/introduction-of-database-normalization/" }],
      videos: [{ label: "Database Normalization Explained", url: "https://www.youtube.com/watch?v=GFQaEYEc8_8" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">DBMS Normalization — Intermediate</h4>
        <p><strong>BCNF (Boyce-Codd Normal Form):</strong> Stronger than 3NF. For every functional dependency X → Y, X must be a <em>superkey</em>. A relation in 3NF but not BCNF has overlapping candidate keys.</p>
        <p><strong>4NF:</strong> No multi-valued dependencies (MVD). If A ↠ B and A ↠ C, and B and C are independent, decompose.</p>
        <p><strong>Functional Dependency:</strong> X → Y means knowing X determines Y. Armstrong's axioms: Reflexivity, Augmentation, Transitivity.</p>
        <p><strong>Candidate Key vs Primary Key:</strong> A candidate key is any minimal set of attributes that uniquely identifies a row. A primary key is one chosen candidate key.</p>
        <p><strong>Finding closures:</strong> Compute X+ (closure of X) to determine if X is a superkey or to find all FDs derivable from X.</p>
      `,
      docs: [{ label: "GeeksforGeeks — BCNF", url: "https://www.geeksforgeeks.org/boyce-codd-normal-form-bcnf/" }],
      videos: [{ label: "BCNF Decomposition", url: "https://www.youtube.com/watch?v=NNjUhvvwOrk" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">DBMS Normalization — Advanced</h4>
        <p><strong>Lossless-join decomposition:</strong> A decomposition R → (R1, R2) is lossless if R1 ∩ R2 → R1 or R1 ∩ R2 → R2. Always check before decomposing.</p>
        <p><strong>Dependency-preserving decomposition:</strong> After decomposition, all original FDs should still be enforceable in one of the relations without a join. BCNF decomposition may not preserve dependencies — 3NF always does.</p>
        <p><strong>5NF / PJNF:</strong> No join dependencies except those implied by candidate keys. Rarely needed in practice.</p>
        <p><strong>Denormalization:</strong> Intentionally introducing redundancy for read performance. Common in data warehouses and OLAP systems (star/snowflake schemas).</p>
        <p><strong>Armstrong's axioms (complete &amp; sound):</strong> Reflexivity, Augmentation, Transitivity. Derived rules: Union, Decomposition, Pseudo-transitivity.</p>
      `,
      docs: [{ label: "GeeksforGeeks — 4NF and 5NF", url: "https://www.geeksforgeeks.org/introduction-of-4th-and-5th-normal-form-in-dbms/" }],
      videos: [{ label: "Advanced Normalization", url: "https://www.youtube.com/watch?v=aAx_JoEDXQA" }]
    }
  },

  "Indexing": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">DBMS Indexing — Fundamentals</h4>
        <p>An index is a data structure that speeds up row retrieval — like a book's index. Without an index, the DB does a <em>full table scan</em> O(n). With an index, it can locate rows in O(log n) or O(1).</p>
        <p><strong>Trade-off:</strong> Indexes speed up SELECT but slow down INSERT/UPDATE/DELETE (index must be updated too) and consume extra disk space.</p>
        <p><strong>Types:</strong></p>
        <ul>
          <li><strong>Clustered index:</strong> Rows physically stored in index order. One per table (usually the primary key).</li>
          <li><strong>Non-clustered index:</strong> Separate structure pointing to row locations. Multiple allowed per table.</li>
        </ul>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>CREATE INDEX idx_name ON Employees(last_name);
CREATE UNIQUE INDEX idx_email ON Users(email);</code></pre>
      `,
      docs: [{ label: "GeeksforGeeks — Database Indexing", url: "https://www.geeksforgeeks.org/indexing-in-databases-set-1/" }],
      videos: [{ label: "SQL Indexing Explained", url: "https://www.youtube.com/watch?v=HrvXbQCR4ZI" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">DBMS Indexing — Intermediate</h4>
        <p><strong>B-Tree Index:</strong> The default index type. Balanced tree where each node contains sorted keys + pointers. Supports equality (<code>=</code>), range (<code>&lt;, &gt;, BETWEEN</code>), and prefix queries. O(log n) operations.</p>
        <p><strong>Hash Index:</strong> Hash key → direct bucket lookup. O(1) equality lookups but <strong>cannot</strong> do range queries. Used in PostgreSQL hash indexes, MySQL MEMORY tables.</p>
        <p><strong>Composite Index:</strong> Index on multiple columns. Order matters — <code>INDEX(a,b,c)</code> supports queries on (a), (a,b), (a,b,c) but NOT (b) alone.</p>
        <p><strong>Covering Index:</strong> An index that includes all columns needed by the query — avoids accessing the actual table row (index-only scan). Very fast.</p>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>-- Covering index for this query:
SELECT name, salary FROM Employees WHERE dept = 'Engineering';
CREATE INDEX idx_covering ON Employees(dept, name, salary);</code></pre>
      `,
      docs: [{ label: "Use The Index Luke — B-Tree", url: "https://use-the-index-luke.com/sql/anatomy" }],
      videos: [{ label: "Database Indexing Deep Dive", url: "https://www.youtube.com/watch?v=ITcOiLSfVJQ" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">DBMS Indexing — Advanced</h4>
        <p><strong>B+ Tree vs B-Tree:</strong> B+ Tree stores all data in leaf nodes (linked for range scans). Internal nodes store only keys. B+ Trees are used by virtually all modern RDBMS (InnoDB, PostgreSQL).</p>
        <p><strong>Index Selectivity:</strong> (distinct values / total rows). High selectivity → index is efficient. Low selectivity (e.g. boolean column) → full scan may be faster.</p>
        <p><strong>Partial Index:</strong> Index only a subset of rows. <code>CREATE INDEX ON Orders(customer_id) WHERE status = 'pending'</code> — smaller, faster.</p>
        <p><strong>Expression Index / Functional Index:</strong> Index on an expression: <code>CREATE INDEX ON Users(LOWER(email))</code> — supports <code>WHERE LOWER(email) = ...</code>.</p>
        <p><strong>Index Fragmentation:</strong> Over time, page splits cause index pages to be partially filled. <code>REBUILD</code> vs <code>REORGANIZE</code>: rebuild recreates from scratch (offline), reorganize defragments in place (online).</p>
        <p><strong>Bitmap Index:</strong> One bit per row per distinct value. Extremely efficient for low-cardinality columns with AND/OR operations (used in data warehouses, not OLTP).</p>
      `,
      docs: [{ label: "PostgreSQL — Indexes", url: "https://www.postgresql.org/docs/current/indexes.html" }],
      videos: [{ label: "Advanced Database Indexing", url: "https://www.youtube.com/watch?v=oeDBQ5K6pqo" }]
    }
  },

  "Transactions": {
    EASY: {
      text: `
        <h4 style="color:var(--neon-green)">DBMS Transactions — Fundamentals</h4>
        <p>A transaction is a logical unit of work that must be executed <em>atomically</em>. Transactions satisfy the <strong>ACID</strong> properties:</p>
        <ul>
          <li><strong>Atomicity:</strong> All operations succeed or none do (all-or-nothing).</li>
          <li><strong>Consistency:</strong> DB moves from one valid state to another. No integrity constraints violated.</li>
          <li><strong>Isolation:</strong> Concurrent transactions execute as if they were serial.</li>
          <li><strong>Durability:</strong> Once committed, changes survive crashes (written to disk via WAL).</li>
        </ul>
        <pre style="background:#111;padding:12px;border-radius:4px;overflow-x:auto"><code>BEGIN;
    UPDATE Accounts SET balance = balance - 100 WHERE id = 1;
    UPDATE Accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;   -- or ROLLBACK; on error</code></pre>
      `,
      docs: [{ label: "GeeksforGeeks — ACID Properties", url: "https://www.geeksforgeeks.org/acid-properties-in-dbms/" }],
      videos: [{ label: "ACID Properties Explained", url: "https://www.youtube.com/watch?v=Cj1Rbs20ZHI" }]
    },
    MEDIUM: {
      text: `
        <h4 style="color:var(--neon-green)">DBMS Transactions — Intermediate</h4>
        <p><strong>Isolation Levels</strong> (weakest to strongest):</p>
        <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
          <tr style="color:var(--neon-blue)"><th style="text-align:left;padding:4px">Level</th><th style="padding:4px">Dirty Read</th><th style="padding:4px">Non-Repeatable</th><th style="padding:4px">Phantom Read</th></tr>
          <tr><td style="padding:4px">READ UNCOMMITTED</td><td style="padding:4px;color:#f00">Yes</td><td style="padding:4px;color:#f00">Yes</td><td style="padding:4px;color:#f00">Yes</td></tr>
          <tr><td style="padding:4px">READ COMMITTED</td><td style="padding:4px;color:#0f0">No</td><td style="padding:4px;color:#f00">Yes</td><td style="padding:4px;color:#f00">Yes</td></tr>
          <tr><td style="padding:4px">REPEATABLE READ</td><td style="padding:4px;color:#0f0">No</td><td style="padding:4px;color:#0f0">No</td><td style="padding:4px;color:#f00">Yes*</td></tr>
          <tr><td style="padding:4px">SERIALIZABLE</td><td style="padding:4px;color:#0f0">No</td><td style="padding:4px;color:#0f0">No</td><td style="padding:4px;color:#0f0">No</td></tr>
        </table>
        <p style="margin-top:8px">*InnoDB prevents phantom reads at REPEATABLE READ using gap locks. Standard SQL does not guarantee this.</p>
        <p><strong>Dirty read:</strong> Reading uncommitted data. <strong>Non-repeatable read:</strong> Same row read twice gives different results. <strong>Phantom read:</strong> Rerunning a range query returns different rows.</p>
      `,
      docs: [{ label: "GeeksforGeeks — Isolation Levels", url: "https://www.geeksforgeeks.org/transaction-isolation-levels-dbms/" }],
      videos: [{ label: "Transaction Isolation Levels", url: "https://www.youtube.com/watch?v=4EajrPgJAk0" }]
    },
    HARD: {
      text: `
        <h4 style="color:var(--neon-green)">DBMS Transactions — Advanced</h4>
        <p><strong>Two-Phase Locking (2PL):</strong></p>
        <ul>
          <li><em>Growing phase:</em> Acquire locks; release none.</li>
          <li><em>Shrinking phase:</em> Release locks; acquire none.</li>
        </ul>
        <p>Guarantees serializability. Strict 2PL holds all exclusive locks until commit/rollback — avoids cascading rollbacks.</p>
        <p><strong>MVCC (Multi-Version Concurrency Control):</strong> PostgreSQL / InnoDB keep multiple versions of rows. Readers never block writers; writers never block readers. Old versions are cleaned up by a vacuum/purge process.</p>
        <p><strong>WAL (Write-Ahead Log):</strong> Changes are logged to WAL on disk before being applied to data pages. On crash, WAL replay restores consistency. Provides durability (D in ACID).</p>
        <p><strong>Distributed Transactions — 2PC (Two-Phase Commit):</strong></p>
        <ul>
          <li><em>Phase 1 (Prepare):</em> Coordinator asks all participants to vote commit/abort.</li>
          <li><em>Phase 2 (Commit/Abort):</em> If all vote yes → commit; else → rollback all.</li>
        </ul>
        <p>Blocking protocol — if coordinator crashes after prepare but before commit, participants are blocked. Solved by 3PC or Paxos-based protocols.</p>
      `,
      docs: [{ label: "GeeksforGeeks — 2PL", url: "https://www.geeksforgeeks.org/two-phase-locking-protocol/" }],
      videos: [{ label: "MVCC and 2PC Deep Dive", url: "https://www.youtube.com/watch?v=e7BufAVwDiM" }]
    }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// App State & DOM Setup
// ─────────────────────────────────────────────────────────────────────────────
let currentUser   = null;
let selectedField = "";
let selectedTopic = "";
let selectedDiff  = "";

document.addEventListener("DOMContentLoaded", async () => {
  currentUser = await checkAuth();
  if (!currentUser) { window.location.href = "index.html"; return; }

  document.getElementById("playerName").textContent = currentUser.username;
  document.getElementById("playerLvl").textContent  = `LVL ${currentUser.level || 0}`;
  loadLeaderboard();

  const step1       = document.getElementById("step1");
  const step2       = document.getElementById("step2");
  const stepDiff    = document.getElementById("stepDiff");
  const stepIntel   = document.getElementById("stepIntel");
  const step3       = document.getElementById("step3");

  const subjectsContainer = document.getElementById("subjectsContainer");
  const topicsContainer   = document.getElementById("topicsContainer");
  const launchBtn         = document.getElementById("launchBtn");
  const msgBox            = document.getElementById("gameError");

  function showError(msg) {
    msgBox.textContent = msg;
    msgBox.classList.add("visible");
    setTimeout(() => msgBox.classList.remove("visible"), 3000);
  }

  function showOnly(el) {
    [step1, step2, stepDiff, stepIntel, step3].forEach(s => s.classList.add("hidden"));
    el.classList.remove("hidden");
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ── Step 1: Subjects ────────────────────────────────────────────────────
  let subjectHTML = "";
  for (const field in TOPICS) {
    subjectHTML += `
    <div class="level-card" style="cursor:pointer;" onclick="selectSubject('${field}')">
      <div class="topic-name" style="text-align:center; margin-top:0.5rem; color:var(--neon-green); font-family:var(--font-retro); font-size:1.2rem;">
        ${field.replace("_", " ")}
      </div>
    </div>`;
  }
  subjectsContainer.innerHTML = subjectHTML;

  window.selectSubject = function(field) {
    selectedField = field;
    showOnly(step2);
    let topicHTML = "";
    TOPICS[field].forEach(topic => {
      topicHTML += `
      <div class="level-card" style="cursor:pointer; border-color:var(--neon-blue);" onclick="selectTopic('${topic}')">
        <div class="topic-name" style="text-align:center; margin-top:0.5rem; color:var(--text-main); font-size:1.5rem;">${topic}</div>
      </div>`;
    });
    topicsContainer.innerHTML = topicHTML;
  };

  // ── Step 2: Topics ──────────────────────────────────────────────────────
  window.selectTopic = function(topic) {
    selectedTopic = topic;
    showOnly(stepDiff);
  };

  // Back: Step 2 → Step 1
  document.getElementById("backToSubjectsBtn").addEventListener("click", () => showOnly(step1));
  // Back: StepDiff → Step 2
  document.getElementById("backToTopicsBtn").addEventListener("click",   () => showOnly(step2));

  // ── Step 2.5: Difficulty cards ─────────────────────────────────────────
  document.querySelectorAll(".diff-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".diff-card").forEach(c => c.style.opacity = "1");
      card.style.opacity = "1";
      selectedDiff = card.getAttribute("data-val");
      loadIntel(selectedTopic, selectedDiff);
      showOnly(stepIntel);
    });
  });

  // ── Step 3: Intel ───────────────────────────────────────────────────────
  document.getElementById("backToDiffBtn").addEventListener("click", () => showOnly(stepDiff));

  document.getElementById("proceedToConfigBtn").addEventListener("click", () => {
    document.getElementById("selectedDiffDisplay").textContent = selectedDiff;
    showOnly(step3);
  });

  // ── Step 4: Launch ──────────────────────────────────────────────────────
  document.getElementById("backToIntelBtn").addEventListener("click", () => showOnly(stepIntel));

  launchBtn.addEventListener("click", async () => {
    const count = parseInt(document.getElementById("qCount").value);
    if (!selectedField || !selectedTopic || !selectedDiff) {
      showError("ROUTING ERROR: Mission parameters incomplete.");
      return;
    }
    if (isNaN(count) || count < 1) {
      showError("ROUTING ERROR: Invalid Enemy Count.");
      return;
    }
    try {
      launchBtn.disabled = true;
      launchBtn.textContent = "UPLOADING CONFIG...";
      const res = await apiCall("/game/start", "POST", {
        prepField: selectedField, topic: selectedTopic,
        difficulty: selectedDiff, numberOfQuestions: count
      });
      sessionStorage.setItem("current_game", JSON.stringify(res));
      window.location.href = "arena.html";
    } catch (err) {
      showError(`SYSTEM FAILURE: ${err.message}`);
      launchBtn.disabled = false;
      launchBtn.textContent = "INITIATE COMBAT SEQUENCE";
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Intel Loader (difficulty-matched)
// ─────────────────────────────────────────────────────────────────────────────
function loadIntel(topic, diff) {
  const topicData = INTEL_DATA[topic];
  const intel = (topicData && topicData[diff]) ? topicData[diff]
              : { text: "No intel available for this combination.", docs: [], videos: [] };

  document.getElementById("intelTopicName").textContent = topic;
  document.getElementById("intelDiffBadge").textContent = `INTEL TIER: ${diff} — Content calibrated for your chosen threat level.`;
  document.getElementById("intelText").innerHTML = intel.text;

  const linksDiv = document.getElementById("intelLinks");
  linksDiv.innerHTML = "";
  (intel.docs || []).forEach(doc => {
    const a = document.createElement("a");
    a.href = doc.url; a.target = "_blank";
    a.textContent = `[+] ${doc.label}`;
    a.style.cssText = "display:block;color:var(--neon-green);margin-bottom:5px;";
    linksDiv.appendChild(a);
  });
  if (!intel.docs || intel.docs.length === 0) linksDiv.innerHTML = "No readings available.";

  const videoDiv = document.getElementById("intelVideo");
  videoDiv.innerHTML = "";
  (intel.videos || []).forEach(vid => {
    const a = document.createElement("a");
    a.href = vid.url; a.target = "_blank";
    a.textContent = `[►] ${vid.label}`;
    a.style.cssText = "display:block;color:var(--neon-red);margin-bottom:5px;";
    videoDiv.appendChild(a);
  });
  if (!intel.videos || intel.videos.length === 0) videoDiv.innerHTML = "No videos available.";
}

// ─────────────────────────────────────────────────────────────────────────────
// Leaderboard
// ─────────────────────────────────────────────────────────────────────────────
async function loadLeaderboard() {
  const container = document.getElementById("leaderboardList");
  try {
    const players = await apiCall("/players");
    if (!Array.isArray(players) || players.length === 0) {
      container.innerHTML = '<div class="text-center mt-1 text-muted">No combatants found.</div>';
      return;
    }
    players.sort((a, b) => (b.xp || 0) - (a.xp || 0));
    container.innerHTML = players.map((p, i) => {
      const cls    = i === 0 ? "top-1" : i === 1 ? "top-2" : i === 2 ? "top-3" : "";
      const prefix = i < 3 ? ["👑","🥈","🥉"][i] : `#${i+1}`;
      return `<div class="lb-row ${cls}"><span>${prefix} ${p.username}</span><span>Lv.${p.level||0} (${p.xp||0} XP)</span></div>`;
    }).join("");
  } catch {
    container.innerHTML = '<div class="text-center mt-1 text-danger">Network Error</div>';
  }
}

function logout() {
  localStorage.removeItem("gameprep_token_new");
  window.location.href = "index.html";
}