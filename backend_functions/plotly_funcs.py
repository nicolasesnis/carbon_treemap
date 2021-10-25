import pandas as pd


def build_hierarchical_dataframe(df, levels, value_column, color_columns=None):
    """
    Build a hierarchy of levels for Sunburst or Treemap charts.

    Levels are given starting from the bottom to the top of the hierarchy,
    ie the last level corresponds to the root.
    """
    for col in color_columns:
        df[col] = df[col].astype(float)
    df_all_trees = pd.DataFrame(columns=['label', 'parent', 'value', 'color'])
    for i, level in enumerate(levels):
        df_tree = pd.DataFrame(columns=['label', 'parent', 'value', 'color'])
        if i < len(levels) - 1:
            dfg = df.groupby(levels[i:]).sum().reset_index()
            df_tree['label'] = dfg[level].copy()
            df_tree['parent'] = dfg[levels[i+1]].copy()
            df_tree['color'] = dfg[color_columns[0]]
        else:
            dfg = df.groupby(levels[i:]).agg(
                {color_columns[0]: ['mean'], color_columns[1]: ['sum']}).reset_index()
            df_tree['label'] = dfg[level].copy()
            df_tree['parent'] = 'total'
            df_tree['color'] = dfg[color_columns[0]]
        df_tree['value'] = dfg[value_column]
        df_tree['level'] = level
        df_all_trees = df_all_trees.append(df_tree, ignore_index=True)
    total = pd.Series(dict(label='total',
                           parent='',
                           level='total',
                           value=df[value_column].sum(),
                           color=0))

    df_all_trees = df_all_trees.append(total, ignore_index=True)
    return df_all_trees
