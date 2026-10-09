#!/usr/bin/env python3
"""Dependency-free smoke checks for the static SimSurance Learning Lab."""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "learning-lab" / "index.html"

class LearningLabSmokeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = PAGE.read_text(encoding="utf-8")

    def test_page_exists_and_has_language_and_viewport(self):
        self.assertTrue(PAGE.exists())
        self.assertIn('<html lang="en">', self.html)
        self.assertIn('name="viewport"', self.html)

    def test_core_sections_exist(self):
        for section in ("id=\"start\"", "id=\"lessons\"", "id=\"try-it\"", "id=\"case-access\"", "id=\"case-capacity\"", "id=\"glossary\""):
            with self.subTest(section=section):
                self.assertIn(section, self.html)

    def test_toy_values_are_explicitly_illustrative(self):
        self.assertIn("ILLUSTRATIVE CALCULATION", self.html)
        self.assertIn("not Pennsylvania reimbursement rates", self.html)
        self.assertIn("fictional plan rule", self.html)

    def test_interactive_logic_is_present(self):
        self.assertIn("function updateAmount()", self.html)
        self.assertIn("data-level", self.html)
        self.assertIn("data-case", self.html)

    def test_internal_links_have_targets(self):
        hrefs = re.findall(r'href="#([^"]+)"', self.html)
        ids = set(re.findall(r'\bid="([^"]+)"', self.html))
        for href in hrefs:
            with self.subTest(target=href):
                self.assertIn(href, ids)

    def test_labels_reference_existing_controls(self):
        labels = re.findall(r'<label[^>]*for="([^"]+)"', self.html)
        ids = set(re.findall(r'\bid="([^"]+)"', self.html))
        for label_for in labels:
            with self.subTest(control=label_for):
                self.assertIn(label_for, ids)

    def test_money_flow_lesson_exists(self):
        money_page = ROOT / "learning-lab" / "money-flow.html"
        self.assertTrue(money_page.exists())
        content = money_page.read_text(encoding="utf-8")
        self.assertIn("The double-counting trap", content)
        self.assertIn("data-lens", content)
        self.assertIn("Fictional values only", content)

    def test_claim_decisions_lesson_exists(self):
        claim_page = ROOT / "learning-lab" / "claim-decisions.html"
        self.assertTrue(claim_page.exists())
        content = claim_page.read_text(encoding="utf-8")
        self.assertIn("A claim is a question, not a payment.", content)
        self.assertIn("Needs review", content)
        self.assertIn("not real insurance policy", content)

    def test_lesson_catalog_exists_and_has_expected_statuses(self):
        import json
        catalog_path = ROOT / "learning-lab" / "lessons.json"
        self.assertTrue(catalog_path.exists())
        catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
        self.assertGreaterEqual(len(catalog["lessons"]), 5)
        valid_statuses = set(catalog["status_legend"])
        for lesson in catalog["lessons"]:
            with self.subTest(lesson=lesson["id"]):
                self.assertIn(lesson["status"], valid_statuses)
                self.assertIn("source_refs", lesson)
                self.assertIn("objectives", lesson)

    def test_lesson_template_requires_source_provenance(self):
        template = (ROOT / "learning-lab" / "LESSON_TEMPLATE.md").read_text(encoding="utf-8")
        self.assertIn("Version and effective date", template)
        self.assertIn("Jurisdiction and applicability", template)
        self.assertIn("exact passage", template)
        self.assertIn("Where it breaks down", template)

if __name__ == "__main__":
    unittest.main()
