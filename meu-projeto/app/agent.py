"""
Agente de Entrevistas e Desafios de Riscos Financeiros (Google ADK)
"""
import os
from dotenv import load_dotenv
from google.adk import Agent
from google.adk.skills import load_skill_from_dir, SkillToolset
from google.adk.toolsets.environment import EnvironmentToolset, LocalEnvironment

load_dotenv()

class FerramentasDeArquivo(EnvironmentToolset):
    """Restringe ferramentas exclusivamente a leitura e escrita segura de arquivos."""
    async def get_tools(self, readonly_context=None):
        tools = await super().get_tools(readonly_context)
        return [t for t in tools if t.name in ("ReadFile", "WriteFile")]

# Inicializa o diretório de progresso
os.makedirs("progresso", exist_ok=True)
env = LocalEnvironment(working_dir="progresso")

skill = load_skill_from_dir("skills/simulador-entrevista-riscos")

root_agent = Agent(
    model=os.getenv("MODEL", "gemini-2.5-flash"),
    system_instruction=(
        "Você é o Agente de Entrevistas Técnicas para vagas de Data Scientist I em Riscos Financeiros. "
        "Siga rigorosamente a regra de gating definida na sua skill antes de iniciar os testes."
    ),
    toolsets=[
        SkillToolset(skills=[skill]),
        FerramentasDeArquivo(environment=env)
    ]
)
