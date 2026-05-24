package com.gameprep.util;

import java.util.List;
import java.util.Map;
import java.util.Set;

public final class GameMap {

    private static final Map<String, List<String>> PATHS = Map.of(
            "OOP", List.of("Classes", "Inheritance", "Polymorphism", "Encapsulation"),
            "DSA", List.of("Arrays", "Linked List", "Stack", "Queue", "Tree", "Graph"),
            "OPERATING_SYSTEM", List.of("Bash Script", "Process", "Thread", "Memory Management"),
            "DBMS", List.of("SQL Basics", "Normalization", "Indexing", "Transactions")
    );

    private GameMap() {
    }

    public static Set<String> getPrepFields() {
        return PATHS.keySet();
    }

    public static List<String> getPath(String prepField) {
        if (prepField == null) {
            return List.of();
        }
        return PATHS.getOrDefault(prepField, List.of());
    }

    public static boolean isTopicInField(String prepField, String topic) {
        if (prepField == null || topic == null) {
            return false;
        }
        return getPath(prepField).stream().anyMatch(topic::equalsIgnoreCase);
    }

    public static String getFirstTopic(String prepField) {
        List<String> path = getPath(prepField);
        return path.isEmpty() ? null : path.get(0);
    }

    public static String getNextTopic(String prepField, String currentTopic) {
        if (prepField == null || currentTopic == null) {
            return null;
        }
        List<String> path = getPath(prepField);
        if (path.isEmpty()) {
            return null;
        }
        for (int i = 0; i < path.size(); i++) {
            if (path.get(i).equalsIgnoreCase(currentTopic)) {
                return (i + 1) < path.size() ? path.get(i + 1) : null;
            }
        }
        return null;
    }
}
