package com.example.demo_spring;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping
    public Map<String, Object> getDashboard() {
        return Map.of(
            "stats", List.of(
                Map.of("label", "Usuários ativos", "value", "1.284", "change", "+12%", "positive", true),
                Map.of("label", "Receita", "value", "R$ 48.2k", "change", "+8,4%", "positive", true),
                Map.of("label", "Tarefas pendentes", "value", "37", "change", "-5", "positive", true),
                Map.of("label", "Taxa de erro", "value", "0,8%", "change", "+0,2%", "positive", false)
            ),
            "chart", List.of(
                Map.of("day", "Seg", "height", 60),
                Map.of("day", "Ter", "height", 85),
                Map.of("day", "Qua", "height", 45),
                Map.of("day", "Qui", "height", 95),
                Map.of("day", "Sex", "height", 70),
                Map.of("day", "Sáb", "height", 30),
                Map.of("day", "Dom", "height", 50)
            ),
            "activities", List.of(
                Map.of("color", "#22c55e", "text", "Novo usuário cadastrado", "time", "há 5 min"),
                Map.of("color", "#3b82f6", "text", "Projeto 'Website Redesign' atualizado", "time", "há 1 h"),
                Map.of("color", "#f59e0b", "text", "Relatório mensal gerado", "time", "há 3 h"),
                Map.of("color", "#06b6d4", "text", "Integração com API configurada", "time", "há 6 h"),
                Map.of("color", "#ef4444", "text", "Falha de login detectada", "time", "há 8 h")
            )
        );
    }
}
