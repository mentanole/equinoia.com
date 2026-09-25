# Working conventions

## Commit convention

Semantic commit messages: `label(scope): description`

Labels: `fix`, `feat`, `chore`, `docs`, `test`, `devops`

```bash
git checkout -b fix-39562
# ... make changes ...
git add <changed-files>
git commit -m "$(cat <<'EOF'
fix(hero): correct clamp() breakpoint on mobile nav

Fixes: https://github.com/mentanole/equinoia.com/issues/39562
EOF
)"
git push origin fix-39562
gh pr create --repo mentanole/equinoia.com --head username:fix-39562 \
  --title "fix(hero): correct clamp() breakpoint on mobile nav" \
  --body "$(cat <<'EOF'
## Summary
- <describe the change very! briefly>

Fixes https://github.com/mentanole/equinoia.com/issues/39562
EOF
)"
```

Never add Co-Authored-By agents in commit messages.
Branch naming for issue fixes: `fix-<issue-number>`

## Design reference

See `DESIGN.md` for the site's design tokens, type scale, and component
patterns. Reuse existing tokens (`--accent`, `--bg`, `--font-display`,
etc.) rather than introducing new ad hoc colors or fonts.
