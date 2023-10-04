from pydantic import BaseModel


class Skill(BaseModel):
    skill_name: str
    skill_desc: str
