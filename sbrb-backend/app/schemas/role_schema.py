from typing import List

from app.schemas.skill_schema import Skill
from pydantic import BaseModel


class Role(BaseModel):
    role_name: str
    role_desc: str


class RoleWithSkills(Role):
    skills: List[Skill]
