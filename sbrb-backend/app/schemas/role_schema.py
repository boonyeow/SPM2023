from typing import List

from pydantic import BaseModel

from app.schemas.skill_schema import Skill


class Role(BaseModel):
    role_name: str
    role_desc: str


class RoleWithSkills(Role):
    skills: List[Skill]
