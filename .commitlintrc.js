module.exports = {
    ignores: [(commit) => commit.includes('init')],
    extends: ['@commitlint/config-conventional'],
    rules: {
        // 信息最大长度
        'footer-leading-blank': [2, 'always'],
        'header-max-length': [2, 'always', 100],
        // 信息不能未空
        'subject-empty': [2, 'never'],
        // 信息类型不能未空
        'type-empty': [2, 'never'],
        // 提交信息的类型
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'perf',
                'style',
                'docs',
                'test',
                'refactor',
                'build',
                'ci',
                'chore',
                'revert',
                'wip',
                'workflow',
                'types',
                'release',
                'temp'
            ]
        ]
    }
};